module Api
  class ApplicationController < ActionController::Base
    # def authenticate
    #   head :unauthorized unless session[:logged_in]
    # end

    def exec_query(sql:, values: [])
      ActiveRecord::Base.connection.exec_query(sql, 'SQL', values)
    end
  end
end

