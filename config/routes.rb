Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :jobs
    resources :departments, only: [:index, :show]
    resources :task_categories, only: [:index, :show]
    resources :tasks, only: [:index, :show]
    resources :documents

    post 'login', to: 'sessions#login'
    delete 'logout', to: 'sessions#logout'
  end
end
