class Task < ApplicationRecord
  include UniqueId

  belongs_to :task_category
  belongs_to :candidate, optional: true
  belongs_to :user
  belongs_to :job, optional: true
end
