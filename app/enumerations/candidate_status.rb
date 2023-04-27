# frozen_string_literal: true

class CandidateStatus < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'new',
      friendly_name: 'New'
    },
    {
      id: 2,
      name: 'screening',
      friendly_name: 'Screening'
    },
    {
      id: 3,
      name: 'interviewing',
      friendly_name: 'Interviewing'
    },
    {
      id: 4,
      name: 'offer',
      friendly_name: 'Offer'
    },
    {
      id: 5,
      name: 'hired',
      friendly_name: 'Hired'
    },
    {
      id: 6,
      name: 'withdraw',
      friendly_name: 'Withdraw'
    }
  ]

  def self.[](name)
    find_by(name:)
  end

  def self.friendly_name_for_id(status_id)
    status = find_by(id: status_id)
    status&.friendly_name || 'Unknown Status'
  end
end
