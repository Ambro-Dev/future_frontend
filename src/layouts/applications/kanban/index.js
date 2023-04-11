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
import MDTypography from "components/MDTypography";
import CategoriesList from "examples/Lists/CategoriesList";
import MDButton from "components/MDButton";
import { useTranslation } from "react-i18next";
import About from "./components/About";

function Kanban() {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [pic, setPic] = useState("/storage/courses/course_images/course_image_11.gif");

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (auth.roles.includes(5150)) {
      fetchTeacherCourses();
    } else {
      fetchUserCourses();
    }
  }, [isVisible, refresh]);

  const handleOpen = async (e) => {
    e.preventDefault();

    setIsVisible(true);
  };
  const handleClose = async (e) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setPic("/storage/courses/course_images/course_image_11.gif");

    setIsVisible(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    axiosPrivate.post("/courses", {
      teacherId: auth.userId,
      name,
      description,
      pic,
    });
    setName("");
    setDescription("");
    setPic("/storage/courses/course_images/course_image_11.gif");
    setTimeout(1000);

    setIsVisible(false);
    setRefresh(!refresh);
  };

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {auth.roles.includes(5150) && (
          <MDBox>
            {isVisible ? (
              <MDBox>
                {name === "" || description === "" ? (
                  <>
                    <MDButton color="success" circular disabled onClick={handleSave}>
                      {t("save")}
                    </MDButton>
                    <MDButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </MDButton>
                  </>
                ) : (
                  <>
                    <MDButton color="success" circular onClick={handleSave}>
                      {t("save")}
                    </MDButton>
                    <MDButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </MDButton>
                  </>
                )}
                <About
                  pic={pic}
                  description={description}
                  name={name}
                  setName={setName}
                  setDescription={setDescription}
                  setPic={setPic}
                />
              </MDBox>
            ) : (
              <MDButton color="success" circular onClick={handleOpen} sx={{ mb: 1 }}>
                {t("add")}
              </MDButton>
            )}
          </MDBox>
        )}

        {courses.length > 0 ? (
          <MDBox py={3}>
            <CategoriesList
              title={t("courses")}
              categories={courses.map((course) => ({
                color: "dark",
                image: course.pic,
                name: course.name,
                description: (
                  <>
                    {course.teacherId.name} {course.teacherId.surname}
                    {"   "}
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                      {course.members.length} {t("members")}
                    </MDTypography>
                  </>
                ),
                route: `/courses/course-info/${course._id}`,
              }))}
            />
          </MDBox>
        ) : (
          <MDBox py={3}>{t("nocourses")}</MDBox>
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
