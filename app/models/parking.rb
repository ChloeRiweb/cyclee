class Parking < ApplicationRecord
  belongs_to :ride

  validates :latitude, :longitude, presence: true
end
