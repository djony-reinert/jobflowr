module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      sql = 'SELECT * FROM users'
      result = exec_query(sql: sql)
      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM users WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { error: 'User not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO users (id, email, password_digest, first_name, last_name, phone, postal_code, country, state, city, street, role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
      values = [params[:email], BCrypt::Password.create(params[:password]), params[:first_name], params[:last_name], params[:phone], params[:postal_code], params[:country], params[:state], params[:city], params[:street], 1,Time.now, Time.now]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create user.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE users SET email = $1, first_name = $2, last_name = $3, phone = $4, postal_code = $5, country = $6, state = $7, city = $8, street = $9, updated_at = $10 WHERE id = $11 RETURNING *'
      values = [params[:email], params[:first_name], params[:last_name], params[:phone], params[:postal_code], params[:country], params[:state], params[:city], params[:street], Time.now, params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.present?
        render json: result.first
      else
        render json: { errorr: 'Unable to update user.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM users WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql: sql, values: values)

      if result.cmd_tuples.positive?
        head :no_content
      else
        render json: { error: 'Unable to delete user.' }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.permit(:email, :password, :first_name, :last_name, :phone, :postal_code, :country, :state, :city, :street, :role_id)
    end
  end
end
