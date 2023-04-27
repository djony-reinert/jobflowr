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
        job_assignments = exec_query(sql: 'SELECT * FROM job_assignments WHERE job_id = $1', values: [params[:id]])

        render json: {
          job: result.first,
          job_assignments:
        }
      else
        render json: { error: 'Job not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO jobs (id, title, status_id, department_id, job_type_id, location, remote_type_id, career_level_id, desired_degree_id, salary_interval, salary_minimum, salary_maximum, description, company, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *' # rubocop:disable Layout/LineLength
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
        create_job_assignments(
          job_id: id,
          recruitment_team: params[:recruitment_team]
        )
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create job.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE jobs SET title = $1, status_id = $2, department_id = $3, job_type_id = $4, location = $5, remote_type_id = $6, career_level_id = $7, desired_degree_id = $8, salary_interval = $9, salary_minimum = $10, salary_maximum = $11, description = $12, company = $13, updated_at = $14 WHERE id = $15 RETURNING *' # rubocop:disable Layout/LineLength
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
        update_job_assignments(
          recruitment_team: params[:recruitment_team]
        )

        render json: result.first, status: :ok
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

    def create_job_assignments(job_id:, recruitment_team:)
      ActiveRecord::Base.transaction do
        recruitment_team&.values&.each do |rt_attributes|
          next if rt_attributes[:job_assignment_id].present? || rt_attributes[:user_id].blank? || rt_attributes[:recruitment_team_role_id].blank? # rubocop:disable Layout/LineLength

          id = SecureRandom.alphanumeric(22)
          sql = 'INSERT INTO job_assignments (id, job_id, user_id, recruitment_team_role_id, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *' # rubocop:disable Layout/LineLength
          values = [
            id,
            job_id,
            rt_attributes[:user_id],
            rt_attributes[:recruitment_team_role_id],
            User.all.take.id,
            User.all.take.id,
            Time.now,
            Time.now
          ]

          exec_query(sql:, values:)
        end
      end
    rescue ActiveRecord::StatementInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
      ActiveRecord::Base.connection.rollback_transaction
    end

    def update_job_assignments(recruitment_team:)
      ActiveRecord::Base.transaction do
        recruitment_team&.each do |_, rt_attributes|
          if rt_attributes[:job_assignment_id].present? &&
             rt_attributes[:user_id].present? &&
             rt_attributes[:recruitment_team_role_id].present?

            sql = 'UPDATE job_assignments SET user_id = $1, recruitment_team_role_id = $2, updated_by = $3, updated_at = $4 WHERE id = $5 RETURNING *' # rubocop:disable Layout/LineLength
            values = [
              rt_attributes[:user_id],
              rt_attributes[:recruitment_team_role_id],
              User.all.take.id,
              Time.now,
              rt_attributes[:job_assignment_id]
            ]

            exec_query(sql:, values:)
          end

          if rt_attributes[:job_assignment_id].present? &&
             (rt_attributes[:user_id].blank? || rt_attributes[:recruitment_team_role_id].blank?)
            destroy_job_assignments(job_assignment_id: rt_attributes[:job_assignment_id])
          end

          if rt_attributes[:job_assignment_id].blank?
            create_job_assignments(
              job_id: job_params[:id],
              recruitment_team: params[:recruitment_team]
            )
          end
        end
      end
    rescue ActiveRecord::StatementInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
      ActiveRecord::Base.connection.rollback_transaction
    end

    def destroy_job_assignments(job_assignment_id:)
      sql = 'DELETE FROM job_assignments WHERE id = $1 RETURNING *'
      values = [job_assignment_id]

      exec_query(sql:, values:)
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
