class Gender < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'undefined',
      friendly_name: 'Undefined'
    },
    {
      id: 2,
      name: 'female',
      friendly_name: 'Female'
    },
    {
      id: 3,
      name: 'male',
      friendly_name: 'Male'
    }
  ]
end