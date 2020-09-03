require 'json'
require 'yaml'

class RidesController < ApplicationController
  before_action :set_ride, only: [:show, :edit, :update]

  def index
    @back_path = search_path
    @rides = Ride.select(:destination_address).order(created_at: :desc).map(&:destination_address).uniq
  end

  def search
    if @last_ride = current_user.rides.last
      @parking = @last_ride.parking
      @address_parking = @parking.address_parking if @parking
    end
    if params[:query].present?
      result = Geocoder.search(params[:query]).first.coordinates
      @ride = Ride.new
      @markers = [{ lat: result.first, lng: result.last }]
    end
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
    @back_path = search_path

    waypoints = get_waypoints(@ride, 'cycling')
    @cycling_waypoints = get_waypoints(@ride, 'cycling')[0]['routes'][0]['geometry']['coordinates']
    @duration = (get_waypoints(@ride, 'cycling')[0]['routes'][0]['duration'] / 60).ceil
    if waypoints[0]['routes'].length > 1
      @cycling_waypoints_alt = get_waypoints(@ride, 'cycling')[0]['routes'][1]['geometry']['coordinates']
      @duration_alt = (get_waypoints(@ride, 'cycling')[0]['routes'][1]['duration'] / 60).ceil
    end
    @markers = [
      # { lat: @cycling_waypoints.first[1], lng: @cycling_waypoints.first[0] },
      { lat: @cycling_waypoints.last[1], lng: @cycling_waypoints.last[0] }
    ]
  end

  def update
    @ride.update(ride_params)
    redirect_to ride_path(@ride)
  end

  def show
    @back_path = edit_ride_path(@ride)

    @markers = [
      # { lat: @ride.origin_latitude, lng: @ride.origin_longitude, className: 'marker_origin' },
      { lat: @ride.destination_latitude, lng: @ride.destination_longitude, className: 'marker_show' }
    ]

    @danger = Danger.new
    @markers_danger = @ride.dangers.map do |danger|
      {
        lat: danger.latitude,
        lng: danger.longitude,
        cat: danger.category
      }
    end

    # afficher les danger sur la show
    @markers_dangers_list = Ride.all.map(&:dangers).flatten.map do |danger_list|
      {
        lat: danger_list.latitude,
        lng: danger_list.longitude,
        cat: danger_list.category
      }
    end

    # @distance = Geocoder::Calculations.distance_between([@ride.origin_latitude,@ride.origin_longitude], [@ride.destination_latitude, @ride.destination_longitude])
    if @ride.bike_friendly
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][1]['geometry']['coordinates']
      @duration = (data[0]['routes'][1]['duration'] / 60).ceil
      @distance = data[0]['routes'][1]['distance'] / 1000
      @color = '#ef596e'
      @steps = data[0]['routes'][1]['legs'][0]['steps']
    else
      data = get_waypoints(@ride, 'cycling')
      @cycling_waypoints = data[0]['routes'][0]['geometry']['coordinates']
      @duration = (data[0]['routes'][0]['duration'] / 60).ceil
      @distance = data[0]['routes'][0]['distance'] / 1000
      @color = '#193c60'
      @steps = data[0]['routes'][0]['legs'][0]['steps']
    end

  end

  private

  def ride_params
    params.require(:ride).permit(:origin_latitude, :origin_longitude, :destination_address, :destination_longitude, :destination_latitude, :bike_friendly)
  end

  def set_ride
    @ride = Ride.find(params[:id])
  end
end
