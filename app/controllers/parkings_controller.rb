class ParkingsController < ApplicationController
  def index
    filepath = 'db/scrape/parkings_spots.json'
    @parkings_all = JSON.parse(File.read(filepath))
    # Spot.where(category: "parking").near()
    @parkings = @parkings_all.select do |element|
      element['geometry']['coordinates'][1].between?(48.8155755, 48.902156) &&
        element['geometry']['coordinates'][0].between?(2.224122, 2.4697602)
    end
    @parking_markers = @parkings.map do |element|
      {
        lat: element['geometry']['coordinates'][1],
        lng: element['geometry']['coordinates'][0]
        # image_url: helpers.asset_url('parking') // a creuser pour remplacer l'image du marker
      }
    end
  end
end
