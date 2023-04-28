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
        uncompleted_tasks_by_user:
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
  end
end
