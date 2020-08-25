class RidesController < ApplicationController

  def search
    # @markers = @rides.map do |ride|
    #   {
    #     lat: ride.destination_latitude,
    #     lng: ride.destination_longitude
    #   }
    # end

    if params[:query].present?
      @ride = Ride.where(destination_address: params[:query])
    end
  end

end
