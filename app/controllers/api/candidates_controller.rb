# frozen_string_literal: true

module Api
  class CandidatesController < ApplicationController
    def index
      sql = 'SELECT * FROM candidates'
      result = exec_query(sql:)

      render json: result.to_a
    end

    def show
      sql = 'SELECT * FROM candidates WHERE id = $1'
      values = [params[:id]]
      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Candidate not found.' }, status: :not_found
      end
    end

    def create
      sql = 'INSERT INTO candidates (first_name, last_name, phone, email, gender_id, country, postal_code, state, city, street, career_level_id, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *' # rubocop:disable Layout/LineLength
      values = [
        candidate_params[:first_name],
        candidate_params[:last_name],
        candidate_params[:phone],
        candidate_params[:email],
        candidate_params[:gender_id],
        candidate_params[:country],
        candidate_params[:postal_code],
        candidate_params[:state],
        candidate_params[:city],
        candidate_params[:street],
        candidate_params[:career_level_id],
        User.all.take.id,
        User.all.take.id,
        Time.now,
        Time.now
      ]
      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first, status: :created
      else
        render json: { error: 'Unable to create candidate.' }, status: :unprocessable_entity
      end
    end

    def update
      sql = 'UPDATE candidates SET first_name = $1, last_name = $2, phone = $3, email = $4, gender_id = $5, country = $6, postal_code = $7, state = $8, city = $9, street = $10, career_level_id = $11, updated_by = $12, updated_at = $13 WHERE id = $14 RETURNING *' # rubocop:disable Layout/LineLength
      values = [
        candidate_params[:first_name],
        candidate_params[:last_name],
        candidate_params[:phone],
        candidate_params[:email],
        candidate_params[:gender_id],
        candidate_params[:country],
        candidate_params[:postal_code],
        candidate_params[:state],
        candidate_params[:city],
        candidate_params[:street],
        candidate_params[:career_level_id],
        User.all.take.id,
        Time.now,
        params[:id]
      ]
      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Candidate not found or unable to update.' }, status: :unprocessable_entity
      end
    end

    def destroy
      sql = 'DELETE FROM candidates WHERE id = $1 RETURNING *'
      values = [params[:id]]
      result = exec_query(sql:, values:)

      if result.present?
        render json: result.first
      else
        render json: { error: 'Candidate not found or unable to delete.' }, status: :unprocessable_entity
      end
    end

    private

    def candidate_params
      params.permit(
        :first_name,
        :last_name,
        :phone,
        :email,
        :gender_id,
        :country,
        :postal_code,
        :state,
        :city,
        :street,
        :career_level_id
      )
    end
  end
end
