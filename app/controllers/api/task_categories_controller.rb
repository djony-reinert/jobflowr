# frozen_string_literal: true

module Api
  class TaskCategoriesController < ApplicationController
    def index
      sql = 'SELECT * FROM task_categories'
      result = exec_query(sql: sql)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM task_categories WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Task category not found.' }, status: :not_found
      end
    end
  end
end
