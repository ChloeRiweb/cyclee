class CreateDangers < ActiveRecord::Migration[6.0]
  def change
    create_table :dangers do |t|
      t.references :ride, null: false, foreign_key: true
      t.string :category
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
