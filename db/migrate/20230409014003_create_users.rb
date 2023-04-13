# frozen_string_literal: true
# rubocop:disable all

class CreateUsers < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :users, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :email, null: false, unique: true
        t.string :password_digest, null: false
        t.string :first_name, null: false
        t.string :last_name, null: false
        t.string :phone
        t.string :postal_code
        t.string :country
        t.string :state
        t.string :city
        t.string :street
        t.integer :role_id, null: false

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :users
    end
  end
end
