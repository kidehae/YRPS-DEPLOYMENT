import React, { useState } from "react";
import type { Submission, User } from "./types";

interface AssignReviewersTableProps {
  submissions: Submission[];
  users: User[];
  onSubmissionUpdate: (
    submissionId: string,
    updates: Partial<Submission>
  ) => void;
}

const AssignReviewersTable: React.FC<AssignReviewersTableProps> = ({
  submissions,
  users,
  onSubmissionUpdate,
}) => {
  const [selectedReviewers, setSelectedReviewers] = useState<{
    [key: string]: string;
  }>({});
  const [bulkReviewer, setBulkReviewer] = useState<string>("");
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(
    new Set()
  );

  const reviewers = users.filter((user) => user.role === "reviewer");

  const handleAssignReviewer = (submissionId: string, reviewerId: string) => {
    if (reviewerId) {
      onSubmissionUpdate(submissionId, {
        assignedReviewer: reviewerId,
        status: "under_review",
      });
      // Clear the selection after assignment
      setSelectedReviewers((prev) => ({
        ...prev,
        [submissionId]: "",
      }));
    }
  };

  const handleBulkAssign = () => {
    if (bulkReviewer && selectedSubmissions.size > 0) {
      selectedSubmissions.forEach((submissionId) => {
        onSubmissionUpdate(submissionId, {
          assignedReviewer: bulkReviewer,
          status: "under_review",
        });
      });
      setSelectedSubmissions(new Set());
      setBulkReviewer("");
    }
  };

  const toggleSelectSubmission = (submissionId: string) => {
    const newSelected = new Set(selectedSubmissions);
    if (newSelected.has(submissionId)) {
      newSelected.delete(submissionId);
    } else {
      newSelected.add(submissionId);
    }
    setSelectedSubmissions(newSelected);
  };

  const selectAllSubmissions = () => {
    if (selectedSubmissions.size === submissions.length) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(submissions.map((s) => s.submissionId)));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under_review":
        return "status-under_review";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return "🔍";
      default:
        return "⏳";
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="admin-card p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-black mb-2">
          All Papers Have Reviewers Assigned!
        </h3>
        <p className="text-gray-600">
          There are currently no papers waiting for reviewer assignment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Bulk Assignment Section */}
      {submissions.length > 0 && (
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-black mb-4">
            📦 Bulk Assign Reviewers
          </h3>
          <div className="flex items-center space-x-4">
            <select
              value={bulkReviewer}
              onChange={(e) => setBulkReviewer(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Reviewer for Bulk Assignment</option>
              {reviewers.map((reviewer) => (
                <option key={reviewer.userId} value={reviewer.userId}>
                  {reviewer.name} ({reviewer.email})
                </option>
              ))}
            </select>
            <button
              onClick={handleBulkAssign}
              disabled={!bulkReviewer || selectedSubmissions.size === 0}
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign to {selectedSubmissions.size} Selected
            </button>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="checkbox"
              id="select-all"
              checked={
                selectedSubmissions.size === submissions.length &&
                submissions.length > 0
              }
              onChange={selectAllSubmissions}
              className="rounded border-gray-300"
            />
            <label htmlFor="select-all" className="text-sm text-gray-600">
              Select all {submissions.length} papers
            </label>
          </div>
        </div>
      )}

      {/* Papers Needing Reviewers */}
      <div className="admin-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">
            📝 Papers Needing Reviewer Assignment
          </h2>
          <p className="text-gray-600">
            {submissions.length} papers waiting for reviewers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Select
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Paper Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Assign Reviewer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.submissionId} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.has(submission.submissionId)}
                      onChange={() =>
                        toggleSelectSubmission(submission.submissionId)
                      }
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-black">
                      {submission.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {users.find((u) => u.userId === submission.author)
                        ?.name || submission.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {getStatusIcon(submission.status)}{" "}
                      {submission.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={selectedReviewers[submission.submissionId] || ""}
                      onChange={(e) =>
                        setSelectedReviewers((prev) => ({
                          ...prev,
                          [submission.submissionId]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Reviewer</option>
                      {reviewers.map((reviewer) => (
                        <option key={reviewer.userId} value={reviewer.userId}>
                          {reviewer.name} - {reviewer.email}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleAssignReviewer(
                          submission.submissionId,
                          selectedReviewers[submission.submissionId]
                        )
                      }
                      disabled={!selectedReviewers[submission.submissionId]}
                      className="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignReviewersTable;
