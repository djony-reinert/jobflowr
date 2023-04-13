class JobRemoteType < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'no',
      friendly_name: 'No | Must work from an office location'
    },
    {
      id: 2,
      name: 'yes',
      friendly_name: 'Yes | Work from anywhere. No office required'
    },
    {
      id: 3,
      name: 'hybrid',
      friendly_name: 'Can work remotely sometimes'
    }
  ]
end