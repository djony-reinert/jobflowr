# frozen_string_literal: true

require 'test_helper'

class TaskCategoriesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get task_categories_index_url
    assert_response :success
  end

  test 'should get show' do
    get task_categories_show_url
    assert_response :success
  end
end
