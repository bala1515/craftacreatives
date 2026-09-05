Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # Root route pointing to Home Controller for React Application
  root "home#index"
end
