class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def default_url_options
    { host: ENV["DOMAIN"] || "localhost:3000" }
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
      alternatives: true
    })
    return data
  end
end
