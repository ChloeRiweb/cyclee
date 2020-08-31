class Hotspot < ApplicationRecord
  CATEGORY = ['parking', 'pompe', 'réparateur', 'danger']
  validates :category, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  reverse_geocoded_by :latitude, :longitude
end
