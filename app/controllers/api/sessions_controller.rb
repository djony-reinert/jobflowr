# module Api
#   class SessionsController < ApplicationController
#     skip_before_action :verify_authenticity_token
#
#     def login
#       user = User.find_by(email: params[:email])
#
#       if user&.authenticate(params[:password])
#         session[:logged_in] = true
#         render json: {}
#       else
#         render json: { error: 'Invalid email or password' }, status: :unauthorized
#       end
#     end
#
#     def logout
#       session[:logged_in] = false
#       head :no_content
#     end
#   end
# end
