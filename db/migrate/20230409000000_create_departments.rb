class CreateDepartments < ActiveRecord::Migration[7.0]
  include SafeMigrationHelper

  def up
    with_lock_timeout do
      create_table :departments, id: false do |t|
        t.string :id, limit: 22, null: false, primary_key: true
        t.string :name, null: false

        t.userstamps
        t.timestamps
      end
    end

    def down
      with_lock_timeout do
        drop_table :departments
      end
    end
  end
end
