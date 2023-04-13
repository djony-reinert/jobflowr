class TaskCategory < ApplicationRecord
  include UniqueId

  has_many :tasks
end
