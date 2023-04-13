# frozen_string_literal: true

module Api
  class DocumentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      document = Document.new(document_params)
      # document.file.attach(params[:document][:filepath])

      if document.save
        render json: document, status: :created
      else
        render json: { error: document.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    def show
      document = Document.find_by(id: params[:id])
      if document.present?
        render json: document
      else
        render json: { error: 'Document not found.' }, status: :not_found
      end
    end

    private

    def document_params
      params.require(:document).permit(:name, :content_type, :filesize, :filepath, :type_id, :owner_id, :owner_type)
    end
  end
end
