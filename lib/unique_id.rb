module UniqueId
  extend ActiveSupport::Concern

  included do
    self.primary_key = :id
    before_create :generate_id
  end

  private

  def generate_id
    self.id = SecureRandom.alphanumeric(22)
  end
end
