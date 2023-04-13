class Document < ApplicationRecord
  include UniqueId
  has_one_attached :file

  belongs_to :owner, polymorphic: true
end
