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

function Billing() {
  const { auth } = useAuth();
  const [results, setResults] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const { data } = await axiosPrivate.get(`/events/exam/${auth.userId}/results`);
        setResults(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setResults(data);
        console.log(data);
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
        {results.length > 0 ? (
          <MDBox py={3}>
            <GradesList
              title="Grades"
              categories={results.map((course) => ({
                course: course.courseName,
                exam: course.examTitle,
                name: course.examId,
                totalScore: course.results[0].json.totalScore,
                maxScore: course.results[0].json.maxScore,
              }))}
            />
          </MDBox>
        ) : (
          <MDBox py={3}>You have no courses</MDBox>
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
