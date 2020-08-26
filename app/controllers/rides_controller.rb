class RidesController < ApplicationController
  before_action :set_ride, only: [:show, :edit, :update]

  def search
    if params[:query].present?
      results = Geocoder.search(params[:query])
      # @ride = Ride.create(destination_address: params[:query])
      @markers = [{ lat: results.first.coordinates.first, lng: results.first.coordinates.last }]
      @ride = Ride.new
    end
  end

  def create
    @ride = Ride.new(ride_params)
    @ride.user = current_user
    if @ride.save
      redirect_to edit_ride_path(@ride)
    else
      render :search
    end
  end

  def edit
  end

  def update
    @ride.update(ride_params)
    redirect_to ride_path(@ride)
  end

  def show
  end

  private

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address)
  end

  def set_ride
    @ride = Ride.find(params[:id])
  end
end
