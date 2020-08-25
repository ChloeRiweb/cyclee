class Ride < ApplicationRecord
  belongs_to :user
  has_many :dangers
  has_one :parking

  geocoded_by :destination_address, latitude: :destination_latitude, longitude: :destination_longitude
  after_validation :geocode, if: :will_save_change_to_destination_address?
end
