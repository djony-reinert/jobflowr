# frozen_string_literal: true

class TaskCategory < ApplicationRecord
  include UniqueId

  has_many :tasks
end
