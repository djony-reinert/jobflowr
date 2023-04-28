# frozen_string_literal: true

def enums
  {
    access_type: Faker::Number.between(from: AccessType.data.pluck(:id).min, to: AccessType.data.pluck(:id).max),
    job_status: Faker::Number.between(from: JobStatus.data.pluck(:id).min, to: JobStatus.data.pluck(:id).max),
    career_level: Faker::Number.between(from: CareerLevel.data.pluck(:id).min, to: CareerLevel.data.pluck(:id).max),
    desired_degree: Faker::Number.between(from: Degree.data.pluck(:id).min, to: Degree.data.pluck(:id).max),
    remote_type: Faker::Number.between(from: JobRemoteType.data.pluck(:id).min, to: JobRemoteType.data.pluck(:id).max),
    gender: Faker::Number.between(from: Gender.data.pluck(:id).min, to: Gender.data.pluck(:id).max),
    candidate_status: Faker::Number.between(from: CandidateStatus.data.pluck(:id).min, to: CandidateStatus.data.pluck(:id).max), # rubocop:disable Layout/LineLength
    candidate_doc_type: Faker::Number.between(from: CandidateDocType.data.pluck(:id).min, to: CandidateDocType.data.pluck(:id).max), # rubocop:disable Layout/LineLength
    job_type: Faker::Number.between(from: JobType.data.pluck(:id).min, to: JobType.data.pluck(:id).max),
    recruitment_team_role: Faker::Number.between(from: RecruitmentTeamRole.data.pluck(:id).min, to: RecruitmentTeamRole.data.pluck(:id).max) # rubocop:disable Layout/LineLength
  }
end

users = []
5.times do
  email = Faker::Internet.unique.email
  user_id = Faker::Alphanumeric.alpha(number: 22)
  email = Faker::Internet.unique.email while User.exists?(email:)

  users << User.create!(
    id: user_id,
    email:,
    password_digest: Faker::Internet.password,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone: Faker::PhoneNumber.cell_phone,
    role_id: enums[:access_type],
    created_by: user_id,
    updated_by: user_id
  )
end

task_categories = ['Phone Screening', 'Resume Review', 'Interview Scheduling', 'Interviewing', 'Reference Check',
                   'Offer Negotiation', 'Background Check', 'Onboarding', 'Application Review', 'Candidate Sourcing']
task_categories.each do |name|
  TaskCategory.create!(
    name:,
    description: Faker::Lorem.sentence,
    created_by: User.ids.sample,
    updated_by: User.ids.sample
  )
end

departments = []
20.times do
  name = Faker::Commerce.unique.department(max: 2)
  name = Faker::Commerce.unique.department(max: 2) while departments.any? { |department| department.name == name }

  departments << Department.create!(
    name:,
    created_by: User.ids.sample,
    updated_by: User.ids.sample
  )
end

jobs = []
60.times do
  title = Faker::Job.unique.title
  title = Faker::Job.unique.title while jobs.any? { |job| job.title == title }

  jobs << Job.create!(
    title:,
    description: Faker::Lorem.sentence,
    location: Faker::Address.city,
    company: Faker::Company.name,
    department_id: departments.sample.id,
    status_id: enums[:job_status],
    job_type_id: enums[:job_type],
    salary_maximum: Faker::Number.between(from: 50_000, to: 150_000),
    salary_minimum: Faker::Number.between(from: 20_000, to: 50_000),
    salary_interval: SalaryInterval.all.map { |interval| interval[:friendly_name] }.sample,
    career_level_id: enums[:career_level],
    desired_degree_id: enums[:desired_degree],
    remote_type_id: enums[:remote_type],
    created_by: User.ids.sample,
    updated_by: User.ids.sample
  )
end

candidates = []
60.times do
  candidate_id = Faker::Alphanumeric.alpha(number: 22).upcase
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  unique_email = false
  until unique_email
    email = Faker::Internet.email(name: "#{first_name} #{last_name}")
    unique_email = true unless Candidate.exists?(email:)
  end

  unique_name = false
  until unique_name
    if Candidate.exists?(first_name:, last_name:)
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
    else
      unique_name = true
    end
  end

  candidates << Candidate.create!(
    id: candidate_id,
    first_name:,
    last_name:,
    phone: Faker::PhoneNumber.cell_phone,
    email:,
    gender_id: enums[:gender],
    career_level_id: enums[:career_level],
    created_by: User.ids.sample,
    updated_by: User.ids.sample
  )
end

documents = []
Candidate.all.each do |candidate|
  2.times do
    documents << Document.create!(
      name: Faker::Lorem.word,
      content_type: MIME::Types.type_for('document.docx').first.content_type,
      filesize: Faker::Number.number(digits: 6),
      filepath: '/filepath/resume.docx',
      type_id: enums[:candidate_doc_type],
      owner: candidate,
      created_by: User.ids.sample,
      updated_by: User.ids.sample
    )
  end
end

Job.all.each do |job|
  Candidate.all.sample(5).each do |candidate|
    next unless JobApplication.where(job_id: job.id, candidate_id: candidate.id).empty?

    JobApplication.create!(
      job_id: job.id,
      candidate_id: candidate.id,
      candidate_status_id: enums[:candidate_status],
      cover_letter_id: documents.sample.id,
      resume_id: documents.sample.id,
      created_by: User.ids.sample,
      updated_by: User.ids.sample,
      created_at: Faker::Time.between(from: DateTime.now - 1.month, to: DateTime.now),
      updated_at: Faker::Time.between(from: DateTime.now - 1.month, to: DateTime.now)
    )
  end
end

Candidate.all.each do |candidate|
  TaskCategory.all.sample(2).each do |task_category|
    job = Job.where(department_id: Department.ids.sample).sample
    start_time = Faker::Time.between(from: DateTime.now, to: DateTime.now)
    end_time = start_time + 30.minutes
    Task.create!(
      title: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraphs(number: 2).join("\n\n"),
      completed: Faker::Boolean.boolean,
      due_date: Faker::Date.between(from: Date.today, to: 1.month.from_now),
      start_time:,
      end_time:,
      user_id: User.ids.sample,
      candidate_id: candidate.id,
      task_category_id: task_category.id,
      job_id: job&.id,
      created_by: User.ids.sample,
      updated_by: User.ids.sample
    )
  end
end

60.times do
  JobAssignment.create!(
    job_id: Job.ids.sample,
    user_id: User.ids.sample,
    recruitment_team_role_id: enums[:recruitment_team_role],
    created_by: User.ids.sample,
    updated_by: User.ids.sample
  )
end
