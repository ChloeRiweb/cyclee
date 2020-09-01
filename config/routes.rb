Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "search", to: "rides#search"

  resources :rides, only: [:index, :create, :show, :edit, :update] do
    resources :dangers, only: [:new, :create]
    resources :parkings, only: [:index]
    resources :pumps, only: [:index]
    resources :repairer, only: [:index]
    # resources :hotspots, only: [:index]
  end
end
