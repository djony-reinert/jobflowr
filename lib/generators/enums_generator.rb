# frozen_string_literal: true

# require 'rails/generators/named_base'
# require 'active_hash'

class EnumsGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  argument :columns, type: :array, default: [], banner: 'field:type field:type'
  class_option :data, type: :string, default: '[]'

  def create_enum_file
    template 'enum.rb.tt', File.join('app/enumerations', class_path, "#{file_name}.rb")
  end

  private

  def data
    JSON.parse(options[:data])
  end
end
