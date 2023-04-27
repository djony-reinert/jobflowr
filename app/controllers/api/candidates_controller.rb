# frozen_string_literal: true

module Api
  class CandidatesController < ApplicationController
    def index
      sql = 'SELECT * FROM candidates'
      result = exec_query(sql:)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM candidates WHERE id = $1'
      values = [candidate_params[:id]]
      result = exec_query(sql:, values:)

      if result.present?
        render json: {
          candidate: result.first,
          job_applications: JobApplication.where(candidate_id: result.first['id']).to_a
        }
      else
        render json: { error: 'Candidate not found.' }, status: :not_found
      end
    end

    def create
      id = SecureRandom.alphanumeric(22)
      sql = 'INSERT INTO candidates (id, first_name, last_name, phone, email, gender_id, career_level_id, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *' # rubocop:disable Layout/LineLength
      values = [
        id,
        candidate_params[:first_name],
        candidate_params[:last_name],
        candidate_params[:phone],
        candidate_params[:email],
        candidate_params[:gender_id],
        candidate_params[:career_level_id],
        User.all.take.id,
        User.all.take.id,
        Time.now,
        Time.now
      ]
      result = exec_query(sql:, values:)

      if result.present?
        create_job_applications(candidate_id: id)
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create candidate.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE candidates SET first_name = $1, last_name = $2, phone = $3, email = $4, gender_id = $5, career_level_id = $6, updated_by = $7, updated_at = $8 WHERE id = $9 RETURNING *' # rubocop:disable Layout/LineLength
      values = [
        candidate_params[:first_name],
        candidate_params[:last_name],
        candidate_params[:phone],
        candidate_params[:email],
        candidate_params[:gender_id],
        candidate_params[:career_level_id],
        User.all.take.id,
        Time.now,
        candidate_params[:id]
      ]
      result = exec_query(sql:, values:)

      if result.present?
        create_job_applications(candidate_id: candidate_params[:id])
        update_job_applications
        render json: result.first
      else
        render json: { error: 'Candidate not found or unable to update.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM candidates WHERE id = $1 RETURNING *'
      values = [candidate_params[:id]]

      # delete dependent job_application first
      exec_query(sql: 'DELETE FROM job_applications WHERE candidate_id = $1', values:)

      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Candidate not found or unable to delete.' }, status: :unprocessable_entity
      end
    end

    private

    def create_job_applications(candidate_id:)
      ActiveRecord::Base.transaction do
        params[:selected_jobs].each do |job_attributes|
          id = SecureRandom.alphanumeric(22)
          sql = 'INSERT INTO job_applications (id, candidate_id, job_id, candidate_status_id, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *' # rubocop:disable Layout/LineLength
          values = [
            id,
            candidate_id,
            job_attributes[:id],
            CandidateStatus[:new].id,
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

    def update_job_applications
      ActiveRecord::Base.transaction do
        params[:job_applications].each do |job_application_id, job_application_attributes|
          sql = 'UPDATE job_applications SET candidate_status_id = $1, updated_by = $2, updated_at = $3 WHERE id = $4 RETURNING *' # rubocop:disable Layout/LineLength
          values = [
            job_application_attributes['candidate_status_id'],
            User.all.take.id,
            Time.now,
            job_application_id
          ]

          exec_query(sql:, values:)
        end
      end
    rescue ActiveRecord::StatementInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
      ActiveRecord::Base.connection.rollback_transaction
    end

    def candidate_params
      params.permit(
        :id,
        :first_name,
        :last_name,
        :phone,
        :email,
        :gender_id,
        :career_level_id
      )
    end
  end
end
