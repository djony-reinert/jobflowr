# Use an official Ruby runtime as a parent image
FROM ruby:3.2.0

# Install PostgreSQL server
RUN apt-get update && apt-get install -y postgresql-client postgresql

# Set the working directory to /app
WORKDIR /app

# Copy the Gemfile and Gemfile.lock into the image and install gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --jobs 20 --retry 5

# Copy the rest of the application code into the image
COPY . .

# Copy the database configuration file into the image
COPY config/database.yml.docker config/database.yml

RUN apt-get update && apt-get install -y sudo
RUN service postgresql start && \
    sudo -u postgres psql -c "CREATE USER jobflowr WITH PASSWORD 'jobflowr';" && \
    sudo -u postgres createdb -O jobflowr jobflowr_development && \
    sudo -u postgres createdb -O jobflowr jobflowr_test && \
    bundle exec rails db:migrate && \
    bundle exec rails db:seed

# Start the PostgreSQL service and the application server
CMD service postgresql start && bundle exec rails server -b 0.0.0.0