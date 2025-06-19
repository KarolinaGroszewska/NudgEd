import React, { useEffect, useState } from "react";
import "./Dashboard.css";

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
  <div className="notebook-stat-card">
    <div className="notebook-stat-value">{value}</div>
    <div className="notebook-stat-label">{label}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/current_user", { credentials: "include" })
      .then(res => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then(data => {
        if (data && data.user) setUser(data.user);
        else setUser(null);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const handleGoogleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return (
    <div className="notebook-bg">
      <div className="notebook-container">
        <div className="notebook-spiral" aria-hidden="true">
          {[...Array(14)].map((_, i) => (
            <div className="notebook-spiral-hole" key={i} />
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
          <h2 className="notebook-subtitle">Automated grade monitoring and student reminders</h2>
          <section className="notebook-stats-row">
            <StatCard label="Students Tracked" value={DUMMY_STATS.studentsTracked} />
            <StatCard label="Missing Assignments" value={DUMMY_STATS.missingAssignments} />
            <StatCard label="Reminders Sent" value={DUMMY_STATS.remindersSent} />
            <StatCard label="Below Threshold" value={DUMMY_STATS.belowThreshold} />
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
                  {DUMMY_AT_RISK.map((student, idx) => (
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
                  {DUMMY_ACTIVITY.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
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