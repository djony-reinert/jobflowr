# frozen_string_literal: true

class User < ApplicationRecord
  include UniqueId
  has_secure_password

  has_many :documents, as: :owner
  has_many :tasks
  has_many :job_assignments
end
