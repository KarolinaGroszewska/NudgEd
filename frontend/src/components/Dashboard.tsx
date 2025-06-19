import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_STATS = {
  studentsTracked: 35,
  missingAssignments: 12,
  remindersSent: 21,
  belowThreshold: 6,
};

const DUMMY_AT_RISK = [
  { name: "Jane Doe", missing: 2, grade: 64, status: "Low" },
  { name: "John Smith", missing: 1, grade: 59, status: "Low" },
];

const DUMMY_ACTIVITY = [
  "Reminder sent to Jane Doe",
  "Reminder sent to John Smith",
  "Assignment synced...",
];

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div style={{
    flex: 1,
    background: "#fff",
    padding: 18,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(60,60,60,0.07)",
    textAlign: "center"
  }}>
    <div style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
    <div style={{ color: "#555", fontWeight: 500 }}>{label}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user info from backend
    fetch("http://localhost:3001/api/current_user", {
      credentials: "include", // this sends the session cookie
    })
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.user) setUser(data.user);
        else setUser(null);
      });
  }, []);

  const handleGoogleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontWeight: 700 }}>NudgEd</h1>
        </div>
        {!user ? (
          <button onClick={handleGoogleLogin} style={{
            padding: "10px 18px",
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Login with Google
          </button>
        ) : (
          <span style={{ fontWeight: 600 }}>Welcome, {user.name}</span>
        )}
      </header>

      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Automated grade monitoring and student reminders</h2>

      <section style={{ display: "flex", gap: 16, marginBottom: 32, justifyContent: "center" }}>
        <StatCard label="Students Tracked" value={DUMMY_STATS.studentsTracked} />
        <StatCard label="Missing Assignments" value={DUMMY_STATS.missingAssignments} />
        <StatCard label="Reminders Sent" value={DUMMY_STATS.remindersSent} />
        <StatCard label="Below Threshold" value={DUMMY_STATS.belowThreshold} />
      </section>

      <section style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 2 }}>
          <h3>At-Risk Students</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fafbfc" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Missing</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_AT_RISK.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.name}</td>
                  <td style={{ textAlign: "center" }}>{student.missing}</td>
                  <td style={{ textAlign: "center" }}>{student.grade}</td>
                  <td>{student.status}</td>
                  <td>
                    <button style={{
                      padding: "5px 12px",
                      background: "#f9ab00",
                      color: "#222",
                      border: "none",
                      borderRadius: 3,
                      cursor: "pointer"
                    }}>
                      Nudge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 32 }}>
            <h3>Recent Activity</h3>
            <ul>
              {DUMMY_ACTIVITY.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <h3>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#" style={{ color: "#4285F4", textDecoration: "none" }}>Connect Canvas</a></li>
            <li><a href="#" style={{ color: "#4285F4", textDecoration: "none" }}>Settings</a></li>
            <li><a href="#" style={{ color: "#4285F4", textDecoration: "none" }}>Reports</a></li>
          </ul>
        </div>
      </section>

      <footer style={{ marginTop: 48, textAlign: "center", color: "#aaa" }}>
        <small>
          v1.0 | <a href="https://github.com/KarolinaGroszewska/NudgEd" style={{ color: "#4285F4" }}>GitHub Repo</a> | <a href="https://github.com/KarolinaGroszewska/NudgEd/issues/new?template=bug_report.md" style={{ color: "#4285F4" }}>Report Bug</a> | <a href="https://github.com/KarolinaGroszewska/NudgEd/issues/new?template=feature_request.md" style={{ color: "#4285F4" }}>Request Feature</a>
        </small>
      </footer>
    </div>
  );
};

export default Dashboard;