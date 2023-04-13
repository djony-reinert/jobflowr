# frozen_string_literal: true

module Api
  class TasksController < ApplicationController
    def index
      sql = 'SELECT * FROM tasks'
      result = exec_query(sql: sql)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM tasks WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Task not found.' }, status: :not_found
      end
    end
  end
end
