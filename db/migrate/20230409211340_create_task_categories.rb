# frozen_string_literal: true
# rubocop:disable all

class CreateTaskCategories < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :task_categories, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :name, null: false
        t.text :description

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :task_categories
    end
  end
end
