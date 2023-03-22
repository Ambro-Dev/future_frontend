/* eslint-disable no-underscore-dangle */
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
import MDTypography from "components/MDTypography";
import CategoriesList from "examples/Lists/CategoriesList";

const REACT_APP_SERVER_URL = "http://localhost:5000";
const defaultPicture = "/storage/user_storage/default/default.png";

function Kanban() {
  const serverUrl = REACT_APP_SERVER_URL;
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [auth.userId]);

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {courses.length > 0 ? (
          <MDBox py={3}>
            <CategoriesList
              title="Courses"
              categories={courses.map((course) => ({
                color: "dark",
                icon: `${serverUrl}${defaultPicture}`,
                name: course.name,
                description: (
                  <>
                    {course.teacherId.name} {course.teacherId.surname}
                    {"   "}
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                      {course.members.length} members
                    </MDTypography>
                  </>
                ),
                route: `/courses/course-info/${course._id}`,
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

export default Kanban;
