class ParkingsController < ApplicationController
  def new
    @ride = Ride.find(params[:ride_id])
    @parking = Parking.new
  end

  def create
    @ride = Ride.find(params[:ride_id])
    @parking = Parking.new(parking_params)
    @parking.ride = @ride
    if @parking.save!
      redirect_to search_path
    else
      render "parking/new"
    end
  end

  private

  def parking_params
    params.require(:parking).permit(:latitude, :longitude)
  end
end
