# frozen_string_literal: true

module Api
  class DashboardController < ApplicationController
    def charts
      render json: {
        job_applications_created_today:,
        candidates_with_offer_status:,
        candidates_hired:,
        completed_tasks:,
        job_assignments_of_published_jobs_by_user:,
        uncompleted_tasks_by_user:,
        job_openings_report_by_department:,
        candidate_progress_report_by_job:,
        job_application_report_by_status:
      }
    end

    def job_applications_created_today
      sql = "SELECT COUNT(*) FROM job_applications WHERE created_at >= '#{Time.zone.now.beginning_of_day}'"
      exec_query(sql:).first['count'].to_i
    end

    def candidates_with_offer_status
      sql = "SELECT COUNT(*) FROM job_applications WHERE candidate_status_id = #{CandidateStatus[:offer].id}"
      exec_query(sql:).first['count'].to_i
    end

    def candidates_hired
      sql = "SELECT COUNT(*) FROM job_applications WHERE candidate_status_id = #{CandidateStatus[:hired].id}"
      exec_query(sql:).first['count'].to_i
    end

    def completed_tasks
      sql = "SELECT COUNT(*) FROM tasks WHERE completed = true AND user_id = '#{params[:user_id]}'"
      exec_query(sql:).first['count'].to_i
    end

    def job_assignments_of_published_jobs_by_user
      sql = "SELECT user_id, COUNT(*) FROM job_assignments JOIN jobs ON job_assignments.job_id = jobs.id WHERE jobs.status_id = #{JobStatus[:published].id} GROUP BY user_id" # rubocop:disable Layout/LineLength
      result = exec_query(sql:)
      result.to_h { |row| [row['user_id'], row['count'].to_i] }
    end

    def uncompleted_tasks_by_user
      sql = 'SELECT created_by, COUNT(*) FROM tasks WHERE completed = false GROUP BY created_by'
      result = exec_query(sql:)
      result.to_h { |row| [row['created_by'], row['count'].to_i] }
    end

    def job_application_report_by_status
      report = []
      CandidateStatus.all.each do |status|
        sql = <<-SQL
      SELECT jobs.title AS job_title,#{' '}
             CONCAT(candidates.first_name, ' ', candidates.last_name) AS candidate_name,
             job_applications.created_at AS applied_at
      FROM job_applications
      INNER JOIN jobs ON jobs.id = job_applications.job_id
      INNER JOIN candidates ON candidates.id = job_applications.candidate_id
      WHERE job_applications.candidate_status_id = #{status.id}
        SQL
        job_applications = exec_query(sql:)
        report << {
          status: status.friendly_name,
          count: job_applications.count,
          job_applications: job_applications.map do |job_application|
            {
              job_title: job_application['job_title'],
              candidate_name: job_application['candidate_name'],
              applied_at: job_application['applied_at']
            }
          end
        }
      end

      report
    end

    def candidate_progress_report_by_job
      sql = <<-SQL
    SELECT#{' '}
      jobs.title AS job,
      COUNT(job_applications.id) AS candidates_count,
      COUNT(CASE WHEN job_applications.candidate_status_id = #{CandidateStatus[:hired].id} THEN 1 END) AS hired_candidates_count,
      json_agg(
        json_build_object(
          'candidate_name', CONCAT(candidates.first_name, ' ', candidates.last_name),
          'status', CASE job_applications.candidate_status_id#{' '}
                     #{CandidateStatus.all.map { |status| "WHEN #{status.id} THEN '#{status.friendly_name}'" }.join("\n")}
          END
        )
      ) AS candidates
    FROM#{' '}
      jobs
      INNER JOIN job_applications ON job_applications.job_id = jobs.id
      INNER JOIN candidates ON candidates.id = job_applications.candidate_id
    GROUP BY#{' '}
      jobs.id
      SQL

      exec_query(sql:).map do |row|
        {
          job: row['job'],
          candidates_count: row['candidates_count'].to_i,
          hired_candidates_count: row['hired_candidates_count'].to_i,
          candidates: JSON.parse(row['candidates'])
        }
      end
    end

    def job_openings_report_by_department
      sql = <<-SQL
        SELECT
          departments.name AS department,
          COUNT(jobs.id) AS job_count,
          COUNT(CASE WHEN jobs.status_id = #{JobStatus[:published].id} THEN 1 END) AS open_job_count,
          SUM(job_applications_count) AS job_applications_count,
          json_agg(
            json_build_object(
              'title', jobs.title,
              'location', jobs.location,
              'job_applications_count', job_applications_count
            )
          ) AS jobs
        FROM
          departments
          JOIN jobs ON jobs.department_id = departments.id
          LEFT JOIN (
            SELECT
              job_id,
              COUNT(*) AS job_applications_count
            FROM
              job_applications
            GROUP BY
              job_id
          ) AS job_applications ON job_applications.job_id = jobs.id
        GROUP BY
          departments.id
      SQL

      result = exec_query(sql:)

      report = []
      result.each do |row|
        report << {
          department: row['department'],
          job_count: row['job_count'].to_i,
          open_job_count: row['open_job_count'].to_i,
          job_applications_count: row['job_applications_count'].to_i,
          jobs: row['jobs'] ? JSON.parse(row['jobs']) : []
        }
      end

      report
    end
  end
end
