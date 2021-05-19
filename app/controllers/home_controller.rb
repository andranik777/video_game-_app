require 'pry'

class HomeController < ApplicationController
  def index
    @user = current_user
    
  end
end
