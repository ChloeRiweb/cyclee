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

    ride_infos
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

  def ride_infos
    if @ride.bike_friendly
      data = get_waypoints_alt(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][1]['geometry']['coordinates']
    else
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][0]['geometry']['coordinates']
    end
    @duration = data[0]['routes'][0]['duration'] / 60
    @distance = data[0]['routes'][0]['distance'] / 1000
  end
end
