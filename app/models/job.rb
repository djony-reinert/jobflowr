# frozen_string_literal: true

class Job < ApplicationRecord
  include UniqueId

  has_many :job_assignments, dependent: :destroy
  has_many :users, through: :job_assignments
  has_many :job_applications, dependent: :destroy
  has_one :department
end
