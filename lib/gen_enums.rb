# Set the input and output directories
input_folder = File.join(__dir__, '../app/enumerations')
output_folder = File.join(__dir__, '../react/src/enums')

# Loop through all .rb files in the input folder
Dir.glob(File.join(input_folder, '*.rb')).each do |file_path|
  # Determine the class name based on the file name
  class_name = File.basename(file_path, '.rb').camelize

  # Require the file to make sure the class is loaded
  require file_path

  # Extract the enum data from the class
  enum_data = class_name.constantize.data

  # Build the export statements
  exports = enum_data.map do |data|
    const_name = data[:name].camelize(:lower)
    "export const #{const_name} = {\n  id: #{data[:id]},\n  friendly_name: '#{data[:friendly_name]}'\n};"
  end.join("\n")

  # Build the types array
  types = enum_data.map { |data| data[:name].camelize(:lower) }.join(",\n  ")

  # Generate the output file
  output_file_path = File.join(output_folder, class_name.camelize(:lower) + '.js')
  File.write(output_file_path, <<~JS)
    #{exports}
    const types = [
      #{types}
    ];

    export default types;
  JS
end
