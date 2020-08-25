class AddDefaultToBikeFriendly < ActiveRecord::Migration[6.0]
  def change
    change_column :rides, :bike_friendly, :boolean, :default => false
  end
end
