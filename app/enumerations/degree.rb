class Degree < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'high_school',
      friendly_name: 'High school diploma or equivalent'
    },
    {
      id: 2,
      name: 'diploma',
      friendly_name: 'Diploma programs'
    },
    {
      id: 3,
      name: 'certificate',
      friendly_name: 'Certificate programs'
    },
    {
      id: 4,
      name: 'undergraduate',
      friendly_name: 'Undergraduate certificate'
    },
    {
      id: 5,
      name: 'associate',
      friendly_name: "Associate's degree"
    },
    {
      id: 6,
      name: 'licentiate',
      friendly_name: 'Licentiate degree'
    },
    {
      id: 7,
      name: 'bachelor',
      friendly_name: "Bachelor's degree"
    },
    {
      id: 8,
      name: 'graduate',
      friendly_name: 'Graduate certificate'
    },
    {
      id: 9,
      name: 'master',
      friendly_name: "Master's degree"
    },
    {
      id: 10,
      name: 'professional',
      friendly_name: 'Professional degree'
    },
    {
      id: 11,
      name: 'doctorate',
      friendly_name: 'Doctorate degree'
    },
    {
      id: 12,
      name: 'postdoctorate',
      friendly_name: 'Post-doctorate'
    }
  ]
end