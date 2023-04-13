# frozen_string_literal: true

class JobApplication < ApplicationRecord
  include UniqueId

  belongs_to :candidate
  belongs_to :job
end
