# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.0'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 7.0.4', '>= 7.0.4.3'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 6.2'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors', require: 'rack/cors'

gem 'active_hash'
gem 'bcrypt'
gem 'mime-types'
gem 'pg'
gem 'pry-rails'
gem 'rubocop-rails'

group :development, :test do
  gem 'faker'
  gem 'pry-byebug', require: false
  gem 'pry-remote', require: false
end

gem 'aws-sdk-s3', '~> 1.120'
