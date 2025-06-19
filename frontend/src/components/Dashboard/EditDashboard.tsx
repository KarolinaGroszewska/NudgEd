import React, { useState, useEffect } from "react";
import "./EditDashboard.css";

async function fetchDashboardData() {
  const res = await fetch("http://localhost:3001/api/current_user", { credentials: "include" });
  const data = await res.json();
  return data.user;
}
async function updateDashboardData(newData: any) {
  // TODO: Implement API call to save dashboard changes
  return true;
}

export default function EditDashboard({ onBack }: { onBack: () => void }) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then(data => {
      setDashboard(data);
      setLoading(false);
    });
  }, []);

  function addClass() {
    const name = prompt("Class name?");
    if (!name) return;
    setDashboard((d: any) => ({
      ...d,
      classes: [...(d.classes || []), { name, assignments: [], students: [] }]
    }));
  }
  function removeClass(idx: number) {
    if (!window.confirm("Remove this class?")) return;
    setDashboard((d: any) => ({
      ...d,
      classes: d.classes.filter((_: any, i: number) => i !== idx)
    }));
  }
  function addStudent(classIdx: number) {
    const userId = prompt("Student ID?");
    if (!userId) return;
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].students.push({ userId, grades: [] });
      return copy;
    });
  }
  function removeStudent(classIdx: number, studentIdx: number) {
    if (!window.confirm("Remove this student?")) return;
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].students.splice(studentIdx, 1);
      return copy;
    });
  }
  function addAssignment(classIdx: number) {
    const title = prompt("Assignment title?");
    if (!title) return;
    const dueDate = prompt("Due date (YYYY-MM-DD)?");
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].assignments.push({ title, dueDate });
      return copy;
    });
  }
  function removeAssignment(classIdx: number, assignmentIdx: number) {
    if (!window.confirm("Remove this assignment?")) return;
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].assignments.splice(assignmentIdx, 1);
      return copy;
    });
  }
  function addGrade(classIdx: number, studentIdx: number) {
    const assignmentId = prompt("Assignment name for grade?");
    if (!assignmentId) return;
    const score = prompt("Score?");
    if (score === null) return;
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].students[studentIdx].grades.push({
        assignmentId,
        score: Number(score)
      });
      return copy;
    });
  }
  function removeGrade(classIdx: number, studentIdx: number, gradeIdx: number) {
    if (!window.confirm("Remove this grade?")) return;
    setDashboard((d: any) => {
      const copy = JSON.parse(JSON.stringify(d));
      copy.classes[classIdx].students[studentIdx].grades.splice(gradeIdx, 1);
      return copy;
    });
  }

  async function saveChanges() {
    setLoading(true);
    await updateDashboardData(dashboard);
    setLoading(false);
    alert("Saved!");
    onBack();
  }

  if (loading) return <div>Loading...</div>;
  return (
    <div className="edit-dashboard-bg">
      <div className="edit-dashboard-container">
        <button className="edit-dashboard-back-btn" onClick={onBack}>← Back to Dashboard</button>
        <h1 className="edit-dashboard-title">Edit Dashboard</h1>
        <button className="edit-dashboard-add-btn" onClick={addClass}>+ Add Class</button>
        {(dashboard.classes || []).map((cls: any, ci: number) => (
          <div key={ci} className="edit-dashboard-class">
            <h2>
              {cls.name}
              <button className="edit-dashboard-remove-btn" onClick={() => removeClass(ci)}>Remove Class</button>
            </h2>
            <div className="edit-dashboard-section">
              <h3>Students</h3>
              <button className="edit-dashboard-add-btn" onClick={() => addStudent(ci)}>+ Add Student</button>
              <ul>
                {(cls.students || []).map((stu: any, si: number) => (
                  <li key={si}>
                    {stu.userId}
                    <button className="edit-dashboard-remove-btn" onClick={() => removeStudent(ci, si)}>Remove</button>
                    <ul>
                      {(stu.grades || []).map((grade: any, gi: number) => (
                        <li key={gi}>
                          {grade.assignmentId}: {grade.score}
                          <button className="edit-dashboard-remove-btn" onClick={() => removeGrade(ci, si, gi)}>Remove Grade</button>
                        </li>
                      ))}
                      <li>
                        <button className="edit-dashboard-add-btn" onClick={() => addGrade(ci, si)}>+ Add Grade</button>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div className="edit-dashboard-section">
              <h3>Assignments</h3>
              <button className="edit-dashboard-add-btn" onClick={() => addAssignment(ci)}>+ Add Assignment</button>
              <ul>
                {(cls.assignments || []).map((assn: any, ai: number) => (
                  <li key={ai}>
                    {assn.title} (Due: {assn.dueDate})
                    <button className="edit-dashboard-remove-btn" onClick={() => removeAssignment(ci, ai)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <button className="edit-dashboard-save-btn" onClick={saveChanges}>Save All Changes</button>
      </div>
    </div>
  );
}