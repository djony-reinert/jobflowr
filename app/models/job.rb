# frozen_string_literal: true

class Job < ApplicationRecord
  include UniqueId

  has_many :job_assignments, dependent: :destroy
  has_many :users, through: :job_assignments
end
