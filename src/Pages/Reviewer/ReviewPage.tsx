import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Paper {
  id: number;
  title: string;
  abstract: string;
  authors?: string;
  status: string;
}

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetch(
          `https://yrs-api-8.onrender.com/api/papers/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch paper");
        const data = await response.json();
        setPaper(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const handleAction = async (action: "approve" | "reject") => {
    // Optional: send status update to backend if allowed
    alert(`Paper ${action}d!`);
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!paper) return <p>No paper found.</p>;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2
        style={{ fontSize: "1.75rem", color: "#2563EB", marginBottom: "1rem" }}
      >
        {paper.title}
      </h2>

      <p style={{ color: "#475569", marginBottom: "1rem" }}>
        <strong>Authors:</strong> {paper.authors || "N/A"}
      </p>

      <p
        style={{ color: "#334155", lineHeight: "1.6", whiteSpace: "pre-wrap" }}
      >
        {paper.abstract || "No abstract provided."}
      </p>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => handleAction("approve")}
          style={{
            backgroundColor: "#22C55E",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ✅ Approve
        </button>

        <button
          onClick={() => handleAction("reject")}
          style={{
            backgroundColor: "#EF4444",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
