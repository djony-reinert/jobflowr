# frozen_string_literal: true
module TableDefinitionExtension
  def userstamps
    column(:created_by, :string, limit: 22)
    column(:updated_by, :string, limit: 22)
  end
end

ActiveRecord::ConnectionAdapters::TableDefinition.send(:include, TableDefinitionExtension)
