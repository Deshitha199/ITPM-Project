import React, { useState, useEffect } from "react";
import styles from "../styles/AsignExaminerforGroup.module.css";
import AdminSidebar from "../components/Sidebar/Sidebar";
import AdminHeader from "../components/SlideHeader/SlideHeader";
import StudentListAdmin from "../components/StudentListTable-AdminAssignExaminers/StudentListAdmin";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function AsignExaminerforGroup() {
  useEffect(() => {
    document.title = "Admin Asign Examiners | SLIIT";
    return () => {
      document.title = "SLIIT";
    };
  }, []);

  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const CustomTabs = [
    {
      to: "/admin-nav",
      iconClass: "bx bx-grid-alt",
      label: "Dashboard",
    },
    {
      to: "/admin-nav",
      iconClass: "bx bx-spreadsheet",
      label: "Publication-Marks",
    },
    {
      to: "/examiner-admin-table",
      iconClass: "bx bx-registered",
      label: "Examiners",
    },
    {
      to: "/examiner-Asign-table",
      iconClass: "bx bx-calendar",
      label: "Schedule-Group",
    },
  ];

  const customNavLinks = [
    { href: "/admin-nav", label: "Home" },
    { href: "/admin-nav", label: "Dashboard" },
    { href: "/examiner-registration-admin", label: "Registration" },
    { href: "/examiner-Asign-table", label: "Asign-Examiners" },
  ];
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    // Update state to show alert every time component refreshes
    setShowAlert(true);
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className={styles.bodyD}>
      <div>
        <AdminSidebar
          sidebarActive={sidebarActive}
          toggleSidebar={toggleSidebar}
          CustomTabs={CustomTabs}
        />
      </div>

      <div
        style={{
          marginTop: "25px",
          marginLeft: sidebarActive ? "250px" : "80px",
          transition: " all 0.6s ease",
        }}
      >
        <AdminHeader customNavLinks={customNavLinks} />
        <div>
          {showAlert && ( // Conditionally render alert based on showAlert state
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info" onClose={closeAlert}>
                <div>
                  <span role="img" aria-label="Magnifying Glass">
                    🔍
                  </span>{" "}
                  Member Details & Examiner Assignment{" "}
                  <span role="img" aria-label="Magnifying Glass">
                    🔍
                  </span>
                </div>
                <div>
                  <strong>Attention!</strong> Clicking on a member's ID will
                  trigger an alert message. From there, you can choose to view
                  detailed member information and schedule examiners for their
                  examinations. Make sure to assign examiners promptly to ensure
                  smooth scheduling. Effective communication and organization
                  are crucial for success!{" "}
                  <span role="img" aria-label="Calendar and Briefcase">
                    📅💼
                  </span>
                </div>
              </Alert>
            </Stack>
          )}
        </div>
        <StudentListAdmin />
      </div>
    </div>
  );
}
