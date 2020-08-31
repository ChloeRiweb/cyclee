class HotspotsController < ApplicationController

  def index
    @ride = Ride.find(params[:ride_id])
    @hotspots = Hotspot.near([@ride.destination_latitude, @ride.destination_longitude], 1, units: :km)

    @hotspot_markers = @hotspots.map do |element|
      {
        lat: element.latitude,
        lng: element.longitude,
        category: element.category
      }
    end

    # raise
  end
end
