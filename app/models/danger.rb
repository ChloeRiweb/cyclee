class Danger < ApplicationRecord
  belongs_to :ride

  validates :category, :latitude, :longitude, :ride_id, presence: true
end
