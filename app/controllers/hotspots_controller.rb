class HotspotsController < ApplicationController
  def parking
    @ride = Ride.find(params[:ride_id])
    @parkings = Hotspot.where(category: "parking").near([@ride.destination_latitude, @ride.destination_longitude], 1, units: :km)

    @parkings_markers = @parkings.map do |element|
      {
        lat: element.latitude,
        lng: element.longitude,
        category: element.category
      }
    end
  end

  def pump
    @ride = Ride.find(params[:ride_id])
        @pumps = Hotspot.where(category: "pump").near([@ride.destination_latitude, @ride.destination_longitude], 1, units: :km)

        @pumps_markers = @pumps.map do |element|
          {
            lat: element.latitude,
            lng: element.longitude,
            category: element.category
          }
        end
  end
end
