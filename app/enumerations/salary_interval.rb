class SalaryInterval < ActiveHash::Base
  self.data = [
    {
      id: 1,
      name: 'hour',
      friendly_name: 'per hour'
    },
    {
      id: 2,
      name: 'day',
      friendly_name: 'per day'
    },
    {
      id: 3,
      name: 'week',
      friendly_name: 'per week'
    },
    {
      id: 4,
      name: 'month',
      friendly_name: 'per month'
    },
    {
      id: 5,
      name: 'annual',
      friendly_name: 'per year'
    }
  ]
end