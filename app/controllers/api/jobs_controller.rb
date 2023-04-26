# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def index
      sql = 'SELECT * FROM jobs'
      result = exec_query(sql:)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM jobs WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql:, values:)

      if result.present?
        job_assignment = exec_query(sql: 'SELECT * FROM job_assignments WHERE job_id = $1', values: [params[:id]])

        render json: {
          job: result.first,
          job_assignment: job_assignment.first
        }
      else
        render json: { error: 'Job not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO jobs (id, title, status_id, department_id, job_type_id, location, remote_type_id, career_level_id, desired_degree_id, salary_interval, salary_minimum, salary_maximum, description, company, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *'
      id = SecureRandom.alphanumeric(22)
      values = [
        id,
        job_params[:title],
        job_params[:status_id],
        job_params[:department_id],
        job_params[:job_type_id],
        job_params[:location],
        job_params[:remote_type_id],
        job_params[:career_level_id],
        job_params[:desired_degree_id],
        job_params[:salary_interval],
        job_params[:salary_minimum],
        job_params[:salary_maximum],
        job_params[:description],
        job_params[:company],
        Time.now,
        Time.now
      ]
      result = exec_query(sql:, values:)

      if result.present?
        assign_recruiter(
          job_id: id,
          user_id: params[:user_id],
          recruitment_team_role_id: params[:recruitment_team_role_id]
        )
      else
        render json: { error: 'Unable to create job.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE jobs SET title = $1, status_id = $2, department_id = $3, job_type_id = $4, location = $5, remote_type_id = $6, career_level_id = $7, desired_degree_id = $8, salary_interval = $9, salary_minimum = $10, salary_maximum = $11, description = $12, company = $13, updated_at = $14 WHERE id = $15 RETURNING *'
      values = [
        job_params[:title],
        job_params[:status_id],
        job_params[:department_id],
        job_params[:job_type_id],
        job_params[:location],
        job_params[:remote_type_id],
        job_params[:career_level_id],
        job_params[:desired_degree_id],
        job_params[:salary_interval],
        job_params[:salary_minimum],
        job_params[:salary_maximum],
        job_params[:description],
        job_params[:company],
        Time.now,
        job_params[:id]
      ]
      result = exec_query(sql:, values:)

      if result.present?
        assign_recruiter(
          job_id: job_params[:id],
          user_id: params[:user_id],
          recruitment_team_role_id: params[:recruitment_team_role_id]
        )
      else
        render json: { error: 'Job not found or unable to update.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM jobs WHERE id = $1 RETURNING *'
      values = [params[:id]]

      # delete dependent job_assignments first
      exec_query(sql: 'DELETE FROM job_assignments WHERE job_id = $1', values:)

      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job not found or unable to delete.' }, status: :unprocessable_entity
      end
    end

    private

    def assign_recruiter(job_id:, user_id:, recruitment_team_role_id:)
      job = nil
      job_assignment = nil

      ActiveRecord::Base.connection.transaction do
        job = Job.find_by(id: job_id)
        user = User.find_by(id: user_id)

        raise ActiveRecord::RecordNotFound unless job && user

        if JobAssignment.where(job_id:).exists?
          sql = 'UPDATE job_assignments SET user_id = $1, recruitment_team_role_id = $2, updated_at = NOW() WHERE job_id = $3 RETURNING id'
          values = [user_id, recruitment_team_role_id, job_id]
        else
          sql = 'INSERT INTO job_assignments (job_id, user_id, recruitment_team_role_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id'
          values = [job_id, user_id, recruitment_team_role_id]
        end

        result = exec_query(sql:, values:)

        job_assignment_id = result.first['id']

        raise ActiveRecord::Rollback unless job_assignment_id

        sql = 'SELECT * FROM job_assignments WHERE id = $1'
        values = [job_assignment_id]
        result = exec_query(sql:, values:)

        raise ActiveRecord::Rollback unless result.present?

        job_assignment = result.first
      end

      if job_assignment
        render json: job, status: :created
      else
        render json: { error: 'Unable to assign recruiter.' }, status: :unprocessable_entity
      end
    end

    def job_params
      params.permit(
        :id,
        :title,
        :status_id,
        :department_id,
        :job_type_id,
        :location,
        :remote_type_id,
        :career_level_id,
        :desired_degree_id,
        :salary_interval,
        :salary_minimum,
        :salary_maximum,
        :description,
        :company
      )
    end
  end
end
