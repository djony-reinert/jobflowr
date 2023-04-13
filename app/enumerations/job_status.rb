# frozen_string_literal: true

class JobStatus < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'draft',
      friendly_name: 'Draft',
      description: 'The job posting is not yet complete and not ready to be published'
    },
    {
      id: 2,
      name: 'published',
      friendly_name: 'Published',
      description: 'The job is live and visible to external job seekers'
    },
    {
      id: 3,
      name: 'internal',
      friendly_name: 'Internal',
      description: 'The job is visible only to internal candidates (employees within the company)'
    },
    {
      id: 4,
      name: 'filled',
      friendly_name: 'Filled',
      description: 'The job has been successfully filled and is no longer open for new applicants'
    },
    {
      id: 5,
      name: 'on_hold',
      friendly_name: 'On Hold',
      description: 'The job is temporarily suspended and is not open for new applicants at the moment'
    },
    {
      id: 6,
      name: 'closed',
      friendly_name: 'Closed',
      description: 'The job has been filled or is no longer open for new applicants'
    },
    {
      id: 7,
      name: 'archived',
      friendly_name: 'Archived',
      description: 'The job has been closed and is no longer visible to job seekers, but is still kept for record-keeping purposes' # rubocop:disable Layout/LineLength
    }
  ]
end
