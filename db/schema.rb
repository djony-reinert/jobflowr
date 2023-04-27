# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_26_004459) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "candidates", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone"
    t.string "email"
    t.integer "gender_id"
    t.integer "career_level_id"
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "departments", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "name", null: false
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "name"
    t.string "content_type"
    t.integer "filesize"
    t.string "filepath"
    t.integer "type_id"
    t.string "owner_id", limit: 22, null: false
    t.string "owner_type", null: false
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "job_applications", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "candidate_id", limit: 22, null: false
    t.string "job_id", limit: 22, null: false
    t.integer "candidate_status_id", null: false
    t.string "cover_letter_id", limit: 22
    t.string "resume_id", limit: 22
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["candidate_id"], name: "index_job_applications_on_candidate_id"
    t.index ["job_id"], name: "index_job_applications_on_job_id"
  end

  create_table "job_assignments", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "user_id", limit: 22, null: false
    t.string "job_id", limit: 22, null: false
    t.integer "recruitment_team_role_id", null: false
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_job_assignments_on_job_id"
    t.index ["user_id"], name: "index_job_assignments_on_user_id"
  end

  create_table "jobs", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "title", null: false
    t.string "description", null: false
    t.string "location"
    t.string "company"
    t.string "department_id", limit: 22
    t.integer "status_id", null: false
    t.integer "salary_maximum"
    t.integer "salary_minimum"
    t.string "salary_interval"
    t.integer "career_level_id"
    t.integer "desired_degree_id"
    t.integer "job_type_id"
    t.integer "remote_type_id"
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_categories", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.boolean "completed", null: false
    t.datetime "due_date", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.string "user_id", limit: 22, null: false
    t.string "candidate_id", limit: 22
    t.string "task_category_id", limit: 22, null: false
    t.string "job_id", limit: 22
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["candidate_id"], name: "index_tasks_on_candidate_id"
    t.index ["job_id"], name: "index_tasks_on_job_id"
    t.index ["task_category_id"], name: "index_tasks_on_task_category_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", id: { type: :string, limit: 22 }, force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone"
    t.integer "role_id", null: false
    t.string "created_by", limit: 22
    t.string "updated_by", limit: 22
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "job_applications", "candidates"
  add_foreign_key "job_applications", "documents", column: "cover_letter_id"
  add_foreign_key "job_applications", "documents", column: "resume_id"
  add_foreign_key "job_applications", "jobs"
  add_foreign_key "job_assignments", "jobs"
  add_foreign_key "job_assignments", "users"
  add_foreign_key "tasks", "candidates"
  add_foreign_key "tasks", "jobs"
  add_foreign_key "tasks", "task_categories"
  add_foreign_key "tasks", "users"
end
