import React, { useState } from "react";
import type { Submission, User } from "./types";

interface SubmissionsTableProps {
  submissions: Submission[];
  users: User[];
  onSubmissionUpdate: (
    submissionId: string,
    updates: Partial<Submission>
  ) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  users,
  onSubmissionUpdate,
}) => {
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(
    null
  );
  const [editForm, setEditForm] = useState<Partial<Submission>>({});
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const reviewers = users.filter((user) => user.role === "reviewer");

  // Filter submissions based on status
  const filteredSubmissions = submissions.filter(
    (submission) => filterStatus === "all" || submission.status === filterStatus
  );

  // Get submissions that can be assigned reviewers (pending or under_review)
  const assignableSubmissions = submissions.filter(
    (sub) => sub.status === "pending" || sub.status === "under_review"
  );

  const handleEdit = (submission: Submission) => {
    setEditingSubmissionId(submission.submissionId);
    setEditForm({
      status: submission.status,
      assignedReviewer: submission.assignedReviewer,
    });
  };

  const handleSave = (submissionId: string) => {
    onSubmissionUpdate(submissionId, editForm);
    setEditingSubmissionId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingSubmissionId(null);
    setEditForm({});
  };

  const handleQuickAssign = (submissionId: string, reviewerId: string) => {
    onSubmissionUpdate(submissionId, {
      assignedReviewer: reviewerId,
      status: "under_review", // Automatically change status when reviewer assigned
    });
  };

  const handleQuickStatusChange = (
    submissionId: string,
    newStatus: Submission["status"]
  ) => {
    onSubmissionUpdate(submissionId, { status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "status-accepted";
      case "rejected":
        return "status-rejected";
      case "under_review":
        return "status-under_review";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return "✅";
      case "rejected":
        return "❌";
      case "under_review":
        return "🔍";
      default:
        return "⏳";
    }
  };

  return (
    <div className="admin-card overflow-hidden fade-in">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              📋 Submissions Management
            </h2>
            <p className="text-gray-600">
              Manage submission status and assign reviewers (
              {assignableSubmissions.length} assignable)
            </p>
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Assigned Reviewer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Quick Actions
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.submissionId} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {submission.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {users.find((u) => u.userId === submission.author)?.name ||
                      submission.author}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingSubmissionId === submission.submissionId ? (
                    <select
                      value={editForm.status || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          status: e.target.value as any,
                        })
                      }
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="under_review">🔍 Under Review</option>
                      <option value="accepted">✅ Accepted</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {getStatusIcon(submission.status)}{" "}
                      {submission.status.replace("_", " ")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingSubmissionId === submission.submissionId ? (
                    <select
                      value={editForm.assignedReviewer || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          assignedReviewer: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">👤 Unassigned</option>
                      {reviewers.map((reviewer) => (
                        <option key={reviewer.userId} value={reviewer.userId}>
                          👨‍💼 {reviewer.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-sm text-gray-600">
                      {submission.assignedReviewer ? (
                        <span className="flex items-center">
                          👨‍💼{" "}
                          {
                            users.find(
                              (u) => u.userId === submission.assignedReviewer
                            )?.name
                          }
                        </span>
                      ) : (
                        <span className="text-orange-500">👤 Unassigned</span>
                      )}
                    </div>
                  )}
                </td>

                {/* Quick Actions Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-2">
                    {/* Quick Reviewer Assignment */}
                    <select
                      onChange={(e) =>
                        handleQuickAssign(
                          submission.submissionId,
                          e.target.value
                        )
                      }
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Quick Assign
                      </option>
                      {reviewers.map((reviewer) => (
                        <option key={reviewer.userId} value={reviewer.userId}>
                          Assign to {reviewer.name}
                        </option>
                      ))}
                    </select>

                    {/* Quick Status Change */}
                    <select
                      onChange={(e) =>
                        handleQuickStatusChange(
                          submission.submissionId,
                          e.target.value as Submission["status"]
                        )
                      }
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Quick Status
                      </option>
                      <option value="accepted">✅ Accept</option>
                      <option value="rejected">❌ Reject</option>
                      <option value="under_review">🔍 Mark Under Review</option>
                      <option value="pending">⏳ Mark Pending</option>
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingSubmissionId === submission.submissionId ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(submission.submissionId)}
                        className="btn-success px-3 py-1 rounded text-white text-sm"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-danger px-3 py-1 rounded text-white text-sm"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(submission)}
                      className="btn-primary px-3 py-1 rounded text-white text-sm"
                    >
                      ✏️ Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No submissions found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsTable;
