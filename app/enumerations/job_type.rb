# frozen_string_literal: true

class JobType < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'full_time',
      friendly_name: 'Full Time'
    },
    {
      id: 2,
      name: 'part_time',
      friendly_name: 'Part Time'
    },
    {
      id: 3,
      name: 'internship',
      friendly_name: 'Internship'
    },
    {
      id: 4,
      name: 'contract',
      friendly_name: 'Contract'
    },
    {
      id: 5,
      name: 'temporary',
      friendly_name: 'Temporary'
    }
  ]
end
