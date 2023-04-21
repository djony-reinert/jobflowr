# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def index
      sql = 'SELECT * FROM jobs'
      result = exec_query(sql: sql)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM jobs WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO jobs (id, title, description, status_id, remote_type_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
      id = SecureRandom.alphanumeric(22)
      values = [id, job_params[:title], job_params[:description], JobStatus[:draft].id, job_params[:remote_type_id], Time.now, Time.now]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create job.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE jobs SET title = $1, description = $2, status_id = $3, remote_type_id = $4, updated_at = $5 WHERE id = $6 RETURNING *'
      values = [job_params[:title], job_params[:description], JobStatus[:published].id, job_params[:remote_type_id], Time.now, params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job not found or unable to update.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM jobs WHERE id = $1 RETURNING *'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Job not found or unable to delete.' }, status: :unprocessable_entity
      end
    end

    private

    def job_params
      params.permit(:title, :description, :remote_type_id)
    end
  end
end
