# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :jobs
    resources :candidates
    resources :job_applications
    resources :departments, only: %i[index show]
    resources :task_categories, only: %i[index show]
    resources :tasks, only: %i[index show]
    resources :documents, only: %i[show create]
  end
end
