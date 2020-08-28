class DangersController < ApplicationController
  def new
    @ride = Ride.find(params[:ride_id])
    @danger = Danger.new
    respond_to do |format|
      format.js
    end
  end

  def create
    @danger = Danger.new(danger_params)
    if @danger.save!
      redirect_to ride_path(@ride)
    else
      render "danger/new"
    end
  end

  private

  def danger_params
    params.require(:danger).permit(:category, :latitude, :longitude)
  end
end
