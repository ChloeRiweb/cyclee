require 'json'

class RidesController < ApplicationController
  before_action :set_ride, only: [:show, :edit, :update]

  def search
    if params[:query].present?
      results = Geocoder.search(params[:query])
      # @ride = Ride.create(destination_address: params[:query])
      @markers = [{ lat: results.first.coordinates.first, lng: results.first.coordinates.last }]
      @ride = Ride.new
    end
    set_parkings_spots
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

  def update
    @ride.update(ride_params)
    redirect_to ride_path(@ride)
  end

  def show
    set_parkings_spots
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
    }, {
      "latitude" => ride.destination_latitude,
      "longitude" => ride.destination_longitude
    }], mode, {
      geometries: "geojson"
    })
    return data[0]['routes'][0]['geometry']['coordinates']
  end

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address, :destination_longitude, :destination_latitude, :bike_friendly)
  end

  def set_ride
    @ride = Ride.find(params[:id])
  end

  def set_parkings_spots
    filepath = 'db/scrape/parkings_spots.json'
    @parkings = JSON.parse(File.read(filepath))

    @parkings_spots = @parkings.select do |element|
      element['geometry']['coordinates'][1].between?(48.8155755, 48.902156) &&
        element['geometry']['coordinates'][0].between?(2.224122, 2.4697602)
    end
    @parkings_spots = @parkings_spots.map do |element|
      { lat: element[:lat], lng: element[:lng] }
    end
  end
end
