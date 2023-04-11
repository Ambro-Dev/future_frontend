/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import GradesList from "examples/Lists/GradesList";
import { useTranslation } from "react-i18next";
import TeacherGrades from "examples/Lists/TeacherGrades";

function Billing() {
  const { t } = useTranslation("translation", { keyPrefix: "grades" });
  const { auth } = useAuth();
  const [results, setResults] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const { data } = await axiosPrivate.get(`/events/exam/${auth.userId}/results`);
        setResults(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/events/exam/${auth.userId}/teacher`);
        setResults(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (auth.roles.includes(5150)) {
      fetchTeacherCourses();
    } else {
      fetchUserResults();
    }
  }, []);

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {results ? (
          <MDBox py={3}>
            {auth.roles.includes(5150) ? (
              <TeacherGrades title={t("title")} userResults={results} />
            ) : (
              <GradesList title={t("title")} userResults={results} />
            )}
          </MDBox>
        ) : (
          <MDBox py={3}>{t("nogrades")}</MDBox>
        )}
        <Footer />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
