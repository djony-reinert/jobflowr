class CareerLevel < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'student',
      friendly_name: 'Student'
    },
    {
      id: 2,
      name: 'entry_level',
      friendly_name: 'Entry-level'
    },
    {
      id: 3,
      name: 'mid_level',
      friendly_name: 'Mid-level'
    },
    {
      id: 4,
      name: 'senior_level',
      friendly_name: 'Senior-level'
    },
    {
      id: 5,
      name: 'coordinator',
      friendly_name: 'Coordinator'
    },
    {
      id: 6,
      name: 'manager',
      friendly_name: 'Manager'
    },
    {
      id: 7,
      name: 'executive',
      friendly_name: 'Executive'
    },
    {
      id: 8,
      name: 'senior_executive',
      friendly_name: 'Senior Executive'
    }
  ]
end