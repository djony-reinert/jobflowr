# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper
  
  def up
    with_lock_timeout do
      create_table :tasks, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :title, null: false
        t.text :description
        t.boolean :completed, null: false
        t.datetime :due_date, null: false
        t.datetime :start_time, null: false
        t.datetime :end_time, null: false
        t.references :user, foreign_key: true, null: false, limit: 22, type: :string
        t.references :candidate, foreign_key: true, limit: 22, type: :string
        t.references :task_category, foreign_key: true, null: false, limit: 22, type: :string
        t.references :job, foreign_key: true, limit: 22, type: :string

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :tasks
    end
  end
end
