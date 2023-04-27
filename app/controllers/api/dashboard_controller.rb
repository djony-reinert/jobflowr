# frozen_string_literal: true

module Api
  class DashboardController < ApplicationController
    def charts
      render json: {
        job_applications_created_today: job_applications_created_today,
        candidates_with_offer_status: candidates_with_offer_status,
        candidates_hired: candidates_hired,
        completed_tasks: completed_tasks,
        job_assignments_of_published_jobs_by_user: job_assignments_of_published_jobs_by_user,
        uncompleted_tasks_by_user: uncompleted_tasks_by_user
      }
    end

    def job_applications_created_today
      JobApplication.where("created_at >= ?", Time.zone.now.beginning_of_day).count
    end

    def candidates_with_offer_status
      JobApplication.where(candidate_status_id: CandidateStatus[:offer].id).count
    end

    def candidates_hired
      JobApplication.where(candidate_status_id: CandidateStatus[:hired].id).count
    end

    def completed_tasks
      Task.where(completed: true, user_id: params[:user_id]).count
    end

    def job_assignments_of_published_jobs_by_user
      JobAssignment.joins(:job)
                   .where(jobs: { status_id: JobStatus[:published].id })
                   .group(:user_id)
                   .count
    end

    def uncompleted_tasks_by_user
      Task.where(completed: false)
          .group(:created_by)
          .count
    end
  end
end
