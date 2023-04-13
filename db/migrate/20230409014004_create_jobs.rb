# frozen_string_literal: true
# rubocop:disable all

class CreateJobs < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :jobs, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :title, null: false
        t.string :description, null: false
        t.string :location
        t.string :company
        t.string :department_id, limit: 22
        t.integer :status_id, null: false
        t.integer :salary_maximum
        t.integer :salary_minimum
        t.string :salary_interval
        t.integer :career_level_id
        t.integer :desired_degree_id
        t.integer :remote_type_id, null: false
        t.boolean :published
        t.datetime :filled_on

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :jobs
    end
  end
end
