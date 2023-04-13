module Api
  class JobApplicationsController < ApplicationController
    def index
      sql = 'SELECT * FROM job_applications'
      result = exec_query(sql: sql)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM job_applications WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job application not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO job_applications (candidate_id, job_id, candidate_status_id, cover_letter_id, resume_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
      values = [job_application_params[:candidate_id], job_application_params[:job_id], job_application_params[:candidate_status_id], job_application_params[:cover_letter_id], job_application_params[:resume_id], Time.now, Time.now]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create job application.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE job_applications SET candidate_id = $1, job_id = $2, candidate_status_id = $3, cover_letter_id = $4, resume_id = $5, updated_at = $6 WHERE id = $7 RETURNING *'
      values = [job_application_params[:candidate_id], job_application_params[:job_id], job_application_params[:candidate_status_id], job_application_params[:cover_letter_id], job_application_params[:resume_id], Time.now, params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job application not found or unable to update.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM job_applications WHERE id = $1 RETURNING *'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job application not found or unable to delete.' }, status: :unprocessable_entity
      end
    end

    private

    def job_application_params
      params.permit(:candidate_id, :job_id, :candidate_status_id, :cover_letter_id, :resume_id)
    end
  end
end
