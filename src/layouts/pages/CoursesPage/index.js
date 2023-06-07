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
import DLTypography from "components/DLTypography";
import CategoriesList from "utils/Lists/CategoriesList";
import DLButton from "components/DLButton";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";
import About from "./components/About";

function CoursesPage() {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(true);
  const { showErrorNotification } = useContext(ErrorContext);
  const [pic, setPic] = useState("/storage/courses/course_images/course_image_11.gif");

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        showErrorNotification("Error", err.message);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        showErrorNotification("Error", err.message);
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
          <DLBox>
            {isVisible ? (
              <DLBox>
                {name === "" || description === "" ? (
                  <>
                    <DLButton color="success" circular disabled onClick={handleSave}>
                      {t("save")}
                    </DLButton>
                    <DLButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </DLButton>
                  </>
                ) : (
                  <>
                    <DLButton color="success" circular onClick={handleSave}>
                      {t("save")}
                    </DLButton>
                    <DLButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </DLButton>
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
              </DLBox>
            ) : (
              <DLButton color="success" circular onClick={handleOpen} sx={{ mb: 1 }}>
                {t("add")}
              </DLButton>
            )}
          </DLBox>
        )}

        {courses.length > 0 ? (
          <DLBox py={3}>
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
                    <DLTypography variant="caption" color="text" fontWeight="medium">
                      {course.members.length} {t("members")}
                    </DLTypography>
                  </>
                ),
                route: `/courses/course-info/${course._id}`,
              }))}
            />
          </DLBox>
        ) : (
          <DLBox py={3}>{t("nocourses")}</DLBox>
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

export default CoursesPage;
