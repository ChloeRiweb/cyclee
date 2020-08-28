class Parking < ApplicationRecord
  belongs_to :ride

  validates :category, :latitude, :longitude, presence: true
end
