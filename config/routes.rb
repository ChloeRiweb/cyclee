Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "search", to: "rides#search"

  resources :rides, only: [:index, :create, :show, :edit, :update] do
    resources :dangers, only: [:index, :new, :create]
    resources :parkings, only: [:new, :create, :index]
    
    get "parking", to: "hotspots#parking"
    get "pump", to: "hotspots#pump"
    get "repairer", to: "hotspots#repairer"
  end
end
