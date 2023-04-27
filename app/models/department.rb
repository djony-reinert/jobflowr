# frozen_string_literal: true

class Department < ApplicationRecord
  include UniqueId

  has_many :jobs
end
