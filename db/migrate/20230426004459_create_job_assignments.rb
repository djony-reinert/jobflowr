# frozen_string_literal: true

class CreateJobAssignments < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :job_assignments, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.references :user, foreign_key: true, null: false, limit: 22, type: :string
        t.references :job, foreign_key: true, null: false, limit: 22, type: :string
        t.integer :recruitment_team_role_id, null: false

        t.userstamps
        t.timestamps
      end
    end
  end

  def down
    with_lock_timeout do
      drop_table :job_assignments
    end
  end
end
