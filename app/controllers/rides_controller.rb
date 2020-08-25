class RidesController < ApplicationController
  def search
    if params[:query].present?
      results = Geocoder.search(params[:query])
      # @ride = Ride.create(destination_address: params[:query])
      @markers = [{ lat: results.first.coordinates.first, lng: results.first.coordinates.last }]
    end

    # @markers = [{ lat: @ride.destination_latitude, lng: @ride.destination_longitude }]
  end
end
