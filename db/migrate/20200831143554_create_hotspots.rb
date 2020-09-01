class CreateHotspots < ActiveRecord::Migration[6.0]
  def change
    create_table :hotspots do |t|
      t.string :category
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
