Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "search", to: "rides#search"
  resources :rides, only: [:create, :show, :edit, :update]
end
