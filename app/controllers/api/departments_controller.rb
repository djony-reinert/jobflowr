# frozen_string_literal: true

module Api
  class DepartmentsController < ApplicationController
    def index
      sql = 'SELECT * FROM departments'
      result = exec_query(sql:)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM departments WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Department not found.' }, status: :not_found
      end
    end
  end
end
