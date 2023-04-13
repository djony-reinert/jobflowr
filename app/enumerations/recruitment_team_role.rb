# frozen_string_literal: true

class RecruitmentTeamRole < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'recruiter',
      friendly_name: 'Recruiter'
    },
    {
      id: 2,
      name: 'sourcer',
      friendly_name: 'Sourcer'
    },
    {
      id: 3,
      name: 'hr_lead',
      friendly_name: 'HR Lead'
    },
    {
      id: 4,
      name: 'coordinator',
      friendly_name: 'Coordinator'
    },
    {
      id: 5,
      name: 'manager',
      friendly_name: 'Hiring Manager'
    }
  ]
end
