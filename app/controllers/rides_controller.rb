require 'json'
require 'yaml'

class RidesController < ApplicationController
  before_action :set_ride, only: [:show, :edit, :update]

  def index
    @rides = Ride.select(:destination_address).map(&:destination_address).uniq
  end

  def search
    if params[:query].present?
      results = Geocoder.search(params[:query])
      # @ride = Ride.create(destination_address: params[:query])
      @markers = [{ lat: results.first.coordinates.first, lng: results.first.coordinates.last }]
      @ride = Ride.new
    end
    # set_parkings_spots
    # set_pumps_spots
    # set_bikes_shops_spots
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

  def edit
    @cycling_waypoints = get_waypoints(@ride, 'cycling')
    @cycling_waypoints_alt = get_waypoints_alt(@ride, 'cycling')
  end

  def update
    @ride.update(ride_params)
    redirect_to ride_path(@ride)
  end

  def show
    @danger = Danger.new
    # set_parkings_spots

    # set_pumps_spots
    # set_bikes_shops_spots
    # @distance = Geocoder::Calculations.distance_between([@ride.origin_latitude,@ride.origin_longitude], [@ride.destination_latitude, @ride.destination_longitude])
    if @ride.bike_friendly
      data = get_waypoints_alt(@ride, 'driving')
      @cycling_waypoints = data[0]['routes'][0]['geometry']['coordinates']
    else
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][0]['geometry']['coordinates']
    end

    @duration = data[0]['routes'][0]['duration'] / 60
    @distance = data[0]['routes'][0]['distance'] / 1000
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
      geometries: "geojson",
      # duration: true
    })
    return data
  end

  def get_waypoints_alt(ride, mode)
    Mapbox.access_token = ENV['MAPBOX_API_KEY']
    data = Mapbox::Directions.directions([{
      "latitude" => ride.origin_latitude,
      "longitude" => ride.origin_longitude
    }, {
      "latitude" => ride.destination_latitude,
      "longitude" => ride.destination_longitude
    }], mode, {
      geometries: "geojson",
      alternatives: true
    })
    if data[0]['routes'].count > 1
      return data
    else
      []
    end
  end

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address, :destination_longitude, :destination_latitude, :bike_friendly)
  end

  def set_ride
    @ride = Ride.find(params[:id])
  end

  # def set_pumps_spots
  #   filepath = 'db/scrape/pumps_spots.yaml'
  #   @pumps = YAML.load_file(filepath)
  # end

  # def set_bikes_shops_spots
  #   filepath = 'db/scrape/bikes_shops_spots.yaml'
  #   @bikes_shops = YAML.load_file(filepath)

  #   @bikes_shops = @bikes_shops.map do |shop|
  #     {
  #       lat: shop[:latitude],
  #       lng: shop[:longitude]
  #       # image_url: helpers.asset_url('parking') // a creuser pour remplacer l'image du marker
  #     }
  #   end
  # end
end
