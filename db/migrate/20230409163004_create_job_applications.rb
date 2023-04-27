# frozen_string_literal: true
# rubocop:disable all

class CreateJobApplications < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :job_applications, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.references :candidate, null: false, foreign_key: true, limit: 22, type: :string
        t.references :job, null: false, foreign_key: true, limit: 22, type: :string
        t.integer :candidate_status_id, null: false
        t.string :cover_letter_id, limit: 22
        t.string :resume_id, limit: 22

        t.userstamps
        t.timestamps
      end

      add_foreign_key :job_applications, :documents, column: :resume_id
      add_foreign_key :job_applications, :documents, column: :cover_letter_id
    end

    def down
      with_lock_timeout do
        drop_table :job_applications
      end
    end
  end
end
