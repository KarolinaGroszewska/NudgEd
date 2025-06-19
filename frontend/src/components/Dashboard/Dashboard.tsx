import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import EditDashboard from "./EditDashboard";

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="notebook-stat-card">
    <div className="notebook-stat-value">{value}</div>
    <div className="notebook-stat-label">{label}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; dashboard: any } | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/current_user", { credentials: "include" })
      .then(res => res.status === 401 ? null : res.json())
      .then(data => setUser(data && data.user ? data.user : null))
      .catch(err => console.error("Failed to fetch user:", err));
  }, [showEditor]); // re-fetch after editing

  const handleGoogleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  // Use real data if available, fallback to 0/empty if not loaded
  const dashboard = user?.dashboard || {
    studentsTracked: 0,
    missingAssignments: 0,
    remindersSent: 0,
    belowThreshold: 0,
    atRisk: [],
    activity: []
  };

  if (showEditor) {
    return <EditDashboard onBack={() => setShowEditor(false)} />;
  }

  return (
    <div className="notebook-bg">
      <div className="notebook-container">
        <div className="notebook-spiral" aria-hidden="true">
          {[...Array(13)].map((_, i) => (
            <div className="notebook-spiral-coil" key={i} />
          ))}
        </div>
        <div className="notebook-page">
          <header className="notebook-header">
            <h1 className="notebook-title">NudgEd</h1>
            <div>
              {!user ? (
                <button className="notebook-login-btn" onClick={handleGoogleLogin}>
                  Login with Google
                </button>
              ) : (
                <span className="notebook-user">Welcome, {user.name}</span>
              )}
            </div>
          </header>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "6px 18px",
              fontWeight: 600,
              marginBottom: 12,
              cursor: "pointer"
            }}
            onClick={() => setShowEditor(true)}
          >
            ✏️ Edit Dashboard
          </button>
          <h2 className="notebook-subtitle">Automated grade monitoring and student reminders</h2>
          <section className="notebook-stats-row">
            <StatCard label="Students Tracked" value={dashboard.studentsTracked} />
            <StatCard label="Missing Assignments" value={dashboard.missingAssignments} />
            <StatCard label="Reminders Sent" value={dashboard.remindersSent} />
            <StatCard label="Below Threshold" value={dashboard.belowThreshold} />
          </section>
          <section className="notebook-content-row">
            <div className="notebook-at-risk">
              <h3>At-Risk Students</h3>
              <table className="notebook-table">
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
                  {(dashboard.atRisk || []).map((student: { name: string; missing: number; grade: number; status: string }, idx: number) => (
                    <tr key={idx}>
                      <td>{student.name}</td>
                      <td>{student.missing}</td>
                      <td>{student.grade}</td>
                      <td>{student.status}</td>
                      <td>
                        <button className="notebook-nudge-btn">Nudge</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="notebook-recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                  {(dashboard.activity || []).map((activity: string, idx: number) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="notebook-quick-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Connect Canvas</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Reports</a></li>
              </ul>
            </div>
          </section>
          <footer className="notebook-footer">
            <small>
              v1.0 | <a href="https://github.com/KarolinaGroszewska/NudgEd">GitHub Repo</a> | <a href="https://github.com/KarolinaGroszewska/NudgEd/issues/new?template=bug_report.md">Report Bug</a> | <a href="https://github.com/KarolinaGroszewska/NudgEd/issues/new?template=feature_request.md">Request Feature</a>
            </small>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;