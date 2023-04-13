class AccessType < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'basic',
      friendly_name: 'Basic'
    },
    {
      id: 2,
      name: 'standard',
      friendly_name: 'Standard'
    },
    {
      id: 3,
      name: 'advanced',
      friendly_name: 'Advanced'
    },
    {
      id: 4,
      name: 'admin',
      friendly_name: 'Admin'
    },
    {
      id: 5,
      name: 'owner',
      friendly_name: 'Owner'
    }
  ]
end