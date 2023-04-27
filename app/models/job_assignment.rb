# frozen_string_literal: true

class JobAssignment < ApplicationRecord
  include UniqueId

  belongs_to :job
  belongs_to :user
end
