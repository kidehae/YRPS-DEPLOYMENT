// export interface User {
//   userId: string;
//   name: string;
//   email: string;
//   role: string;
//   isActive: boolean;
// }

// export interface Submission {
//   submissionId: string;
//   title: string;
//   author: string;
//   status: "pending" | "under_review" | "accepted" | "rejected";
//   assignedReviewer: string | null;
// }

// export interface Stats {
//   totalUsers: number;
//   totalSubmissions: number;
//   acceptanceRate: number;
//   submissionsPerMonth: Array<{
//     month: string;
//     count: number;
//   }>;
//   statusDistribution: {
//     [key: string]: number;
//   };
// }

// export interface ApiResponse<T> {
//   users?: T[];
//   submissions?: T[];
//   error?: string;
//   success?: boolean;
// }
export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface Submission {
  submissionId: string;
  title: string;
  author: string;
  status: "pending" | "under_review" | "accepted" | "rejected";
  assignedReviewer: string | null;
}

export interface Stats {
  totalUsers: number;
  totalSubmissions: number;
  acceptanceRate: number;
  submissionsPerMonth: Array<{
    month: string;
    count: number;
  }>;
  statusDistribution: {
    [key: string]: number;
  };
}

export interface ApiResponse<T> {
  users?: T[];
  submissions?: T[];
  error?: string;
  success?: boolean;
}
