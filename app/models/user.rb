class User < ApplicationRecord
  include UniqueId
  has_secure_password

  has_many :documents, as: :owner
  has_many :tasks
end
