// import clsx from "clsx";

// type Status = "published" | "under review" | "rejected";

// interface StatusBadgeProps {
//   status?: string;
// }

// export default function StatusBadge({
//   status = "under review",
// }: StatusBadgeProps) {
//   const map: Record<Status, { label: string; cls: string }> = {
//     published: {
//       label: "Published",
//       cls: "bg-green-100 text-green-800 border border-green-200",
//     },
//     "under review": {
//       label: "Under Review",
//       cls: "bg-yellow-100 text-yellow-800 border border-yellow-200",
//     },
//     rejected: {
//       label: "Rejected",
//       cls: "bg-red-100 text-red-800 border border-red-200",
//     },
//   };

//   // Validate that the status is one of the allowed values
//   const validStatus: Status =
//     status === "published" || status === "under review" || status === "rejected"
//       ? (status as Status)
//       : "under review";

//   const s = map[validStatus];

//   return (
//     <span className={clsx("px-3 py-1 rounded-full text-xs font-medium", s.cls)}>
//       {s.label}
//     </span>
//   );
// }

import clsx from "clsx";

type Status = "published" | "under review" | "rejected";

interface StatusBadgeProps {
  status?: string;
}

export default function StatusBadge({
  status = "under review",
}: StatusBadgeProps) {
  const map: Record<Status, { label: string; cls: string }> = {
    published: {
      label: "Published",
      cls: "bg-green-100 text-green-800 border border-green-200",
    },
    "under review": {
      label: "Under Review",
      cls: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    },
    rejected: {
      label: "Rejected",
      cls: "bg-red-100 text-red-800 border border-red-200",
    },
  };

  const validStatus: Status =
    status === "published" || status === "under review" || status === "rejected"
      ? (status as Status)
      : "under review";

  const s = map[validStatus];

  return (
    <span
      className={clsx(
        "px-3 py-1 rounded-full text-xs font-medium shadow-sm",
        s.cls
      )}
    >
      {s.label}
    </span>
  );
}
