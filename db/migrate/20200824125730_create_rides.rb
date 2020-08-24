class CreateRides < ActiveRecord::Migration[6.0]
  def change
    create_table :rides do |t|
      t.float :origin_latitude
      t.float :origin_longitude
      t.string :destination_address
      t.float :destination_latitude
      t.float :destination_longitude
      t.boolean :bike_friendly
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
