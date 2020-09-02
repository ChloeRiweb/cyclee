class HotspotsController < ApplicationController
  before_action :set_ride

  def parking
    @parkings = Hotspot.where(category: "parking").near([@ride.destination_latitude, @ride.destination_longitude], 0.5, units: :km)

    @parkings_markers = @parkings.map do |element|
      {
        lat: element.latitude,
        lng: element.longitude,
        category: element.category
      }
    end

    @flag_marker = [{ lat: @ride.destination_latitude, lng: @ride.destination_longitude }]
    ride_infos
  end

  def pump

    @pumps = Hotspot.where(category: "pump")

    @pumps_markers = @pumps.map do |element|
      {
        lat: element.latitude,
        lng: element.longitude,
        category: element.category
      }
    end
    ride_infos
  end

  def repairer
    @repairers = Hotspot.where(category: "repairer").near([@ride.destination_latitude, @ride.destination_longitude], 3, units: :km)
    @repairers_markers = @repairers.map do |element|
      {
        lat: element.latitude,
        lng: element.longitude,
        category: element.category
      }
    end
    ride_infos
  end

  private

  def ride_infos
    if @ride.bike_friendly
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][1]['geometry']['coordinates']
    else
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][0]['geometry']['coordinates']
    end
    @duration = data[0]['routes'][0]['duration'] / 60
    @distance = data[0]['routes'][0]['distance'] / 1000
  end

  def set_ride
    @ride = Ride.find(params[:ride_id])
    @back_path = ride_path(@ride)
  end
end
