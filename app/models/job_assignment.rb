# frozen_string_literal: true

class JobAssignment < ApplicationRecord
  belongs_to :job
  belongs_to :user
end
