class AddColumnAddressToParkings < ActiveRecord::Migration[6.0]
  def change
    add_column :parkings, :address_parking, :string
  end
end
