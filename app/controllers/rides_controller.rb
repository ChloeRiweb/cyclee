class RidesController < ApplicationController
  def search
    # @markers = @rides.map do |ride|
    #   {
    #     lat: ride.destination_latitude,
    #     lng: ride.destination_longitude
    #   }
    # end
  end

  def create
    @ride = Ride.new(ride_params)
    @ride.user = current_user
    if @ride.save
      redirect_to ride_path(@ride)
    else
      render :search
    end
  end

  private

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address)
  end
end
