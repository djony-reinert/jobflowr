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
      sql = 'INSERT INTO jobs (title, description, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *'
      values = [job_params[:title], job_params[:description], Time.now, Time.now]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create job.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE jobs SET title = $1, description = $2, updated_at = $3 WHERE id = $4 RETURNING *'
      values = [job_params[:title], job_params[:description], Time.now, params[:id]]
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
      params.permit(:title)
    end
  end
end
