# frozen_string_literal: true

class CreateCandidates < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :candidates, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :first_name
        t.string :last_name
        t.string :phone
        t.string :email
        t.integer :gender_id
        t.string :country
        t.string :postal_code
        t.string :state
        t.string :city
        t.string :street
        t.integer :career_level_id

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :candidates
    end
  end
end
