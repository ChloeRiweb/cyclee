Hotspot.destroy_all

filepath = 'db/scrape/parkings_spots.json'
@parkings_all = JSON.parse(File.read(filepath))
# Spot.where(category: "parking").near([destination_latitude, destination_longitude], 1, units: :km)
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

@parking_markers.each do |parking_marker|
  Hotspot.create!(category: "parking", latitude: parking_marker[:lat], longitude: parking_marker[:lng])
end

filepath = 'db/scrape/pumps_spots.yaml'
@pumps = YAML.load_file(filepath)

@pumps.each do |pump|
  Hotspot.create!(category: "pump", latitude: pump[:lat], longitude: pump[:lng])
end


filepath = 'db/scrape/bikes_shops_spots.yaml'
@repairers_data = YAML.load_file(filepath)

@repairers = @repairers_data.map do |repairer|
  {
    lat: repairer[:latitude],
    lng: repairer[:longitude]
  }
end

@repairers.each do |repairer|
  Hotspot.create!(category: "repairer", latitude: repairer[:lat], longitude: repairer[:lng])
end

puts "Parkings, pumps and repairers succesfully created!"
