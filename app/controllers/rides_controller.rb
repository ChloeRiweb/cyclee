class RidesController < ApplicationController
  def search
    if params[:query].present?
      @ride = Ride.create(destination_address: params[:query])
    end

    @markers = [{ lat: @ride.destination_latitude, lng: @ride.destination_longitude }]
  end
end
