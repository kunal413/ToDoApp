Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'todos/index'
      post 'todos/create'
      put "todos/update"
      get 'todos/destroy'
       get '/show/:id', to: 'todos#show'
      delete '/destroy/:id', to: 'todos#destroy'
    end
  end
  root 'homepage#index'
  

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
