# frozen_string_literal: true
# rubocop:disable all

class CreateDocuments < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :documents, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :name
        t.string :content_type
        t.integer :filesize
        t.string :filepath
        t.integer :type_id
        t.string :owner_id, limit: 22, null: false
        t.string :owner_type, null: false, polymorphic: true

        t.userstamps
        t.timestamps
      end
    end

    def down
      with_lock_timeout { drop_table :documents }
    end
  end
end
