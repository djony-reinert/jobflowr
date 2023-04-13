class CandidateDocType < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'resume',
      friendly_name: 'Resume'
    },
    {
      id: 2,
      name: 'cover_letter',
      friendly_name: 'Cover Letter'
    },
    {
      id: 3,
      name: 'offer_letter',
      friendly_name: 'Offer Letter'
    },
    {
      id: 4,
      name: 'other',
      friendly_name: 'Other Document'
    }
  ]
end