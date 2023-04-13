# frozen_string_literal: true

class Candidate < ApplicationRecord
  include UniqueId

  has_many :documents, as: :owner
  has_many :job_applications
  has_many :tasks
end
