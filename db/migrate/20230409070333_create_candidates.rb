# frozen_string_literal: true
# rubocop:disable all

class CreateCandidates < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :candidates, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :first_name, null: false
        t.string :last_name, null: false
        t.string :phone
        t.string :email
        t.integer :gender_id
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
