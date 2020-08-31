Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "search", to: "rides#search"

<<<<<<< HEAD
  resources :rides, only: [:create, :show, :edit, :update, :index] do
    resources :parkings, only: [:index]
=======
  resources :rides, only: [:index, :create, :show, :edit, :update] do
    resources :dangers, only: [:new, :create]
>>>>>>> master
  end
end
