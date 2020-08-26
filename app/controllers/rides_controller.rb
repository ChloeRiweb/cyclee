class RidesController < ApplicationController
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
      redirect_to ride_path(@ride)
    else
      render :search
    end
  end

  def show
    @ride = Ride.find(params[:id])
  end

  def edit
    @ride = Ride.find(params[:id])
    @cycling_waypoints = get_waypoints(@ride, 'cycling')
    @driving_waypoints = get_waypoints(@ride, 'driving')
  end

  private

  def get_waypoints(ride, mode)
    Mapbox.access_token = ENV['MAPBOX_API_KEY']
    data = Mapbox::Directions.directions([{
      "latitude" => ride.origin_latitude,
      "longitude" => ride.origin_longitude
    },
    {
      "latitude" => ride.destination_latitude,
      "longitude" => ride.destination_longitude
    }], mode, {
        geometries: "geojson",
    })
    return data[0]['routes'][0]['geometry']['coordinates']
  end

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address)
  end

end
