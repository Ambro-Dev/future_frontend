/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import DLBox from "components/DLBox";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import { useContext, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import GradesList from "utils/Lists/GradesList";
import { useTranslation } from "react-i18next";
import TeacherGrades from "utils/Lists/TeacherGrades";
import ErrorContext from "context/ErrorProvider";

function GradesPage() {
  const { t } = useTranslation("translation", { keyPrefix: "grades" });
  const { auth } = useAuth();
  const [results, setResults] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const { showErrorNotification } = useContext(ErrorContext);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const { data } = await axiosPrivate.get(`/events/exam/${auth.userId}/results`);
        setResults(data);
        setLoading(false);
      } catch (err) {
        showErrorNotification("Error", err.message);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/events/exam/${auth.userId}/teacher`);
        setResults(data);
        setLoading(false);
      } catch (err) {
        showErrorNotification("Error", err.message);
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
          <DLBox py={3}>
            {auth.roles.includes(5150) ? (
              <TeacherGrades title={t("title")} userResults={results} />
            ) : (
              <GradesList title={t("title")} userResults={results} />
            )}
          </DLBox>
        ) : (
          <DLBox py={3}>{t("nogrades")}</DLBox>
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

export default GradesPage;
