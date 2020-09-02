class Parking < ApplicationRecord
  belongs_to :ride

  validates :latitude, :longitude, presence: true

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode, if: :will_save_change_to_address_parking?
end
