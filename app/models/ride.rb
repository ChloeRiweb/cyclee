class Ride < ApplicationRecord
  belongs_to :user
  has_many :dangers
  has_one :parking
end
