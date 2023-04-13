# frozen_string_literal: true

module Api
  class ApplicationController < ActionController::Base
    def exec_query(sql:, values: [])
      ActiveRecord::Base.connection.exec_query(sql, 'SQL', values)
    end
  end
end
