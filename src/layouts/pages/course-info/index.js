/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useContext, useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import Calendar from "utils/Calendar";

// Widgets page components
import UpcomingEvents from "layouts/pages/course-info/components/UpcomingEvents";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "context/socket";
import useAuth from "hooks/useAuth";
import DLTypography from "components/DLTypography";
import DLEditor from "components/DLEditor";
import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";
import TeacherInfo from "./components/TeacherInfo";
import MembersList from "./components/MembersList";
import UploadFile from "./components/UploadFile/index";
import CourseEdit from "./components/CourseEdit";

// Data

function CourseInfo() {
  const { t } = useTranslation("translation", { keyPrefix: "courseinfo" });
  const { auth } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const { socket } = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const [description, setDescription] = useState();
  const [editing, setEditing] = useState(false);

  const handleOpen = async (info) => {
    info.jsEvent.preventDefault();
    const selectedEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
      _id: info.event.extendedProps._id,
      url: info.event.url,
    };

    navigate("/pages/account/event-info", { state: selectedEvent });
  };

  useEffect(() => {
    // Make API call using Axios
    axiosPrivate
      .get(`/events/${courseId}`)
      .then((response) => {
        // Update state with fetched data
        setCalendarEventsData(response.data);
        const currentDateTime = new Date();

        const futureEvents = response.data.filter((event) => {
          const eventStartDate = new Date(event.start); // convert start date to Date object
          return eventStartDate >= currentDateTime; // filter events that start now or in the future
        });
        setNextEvents(futureEvents);
      })
      .catch((error) => {
        console.error(error);
      });

    axiosPrivate
      .get(`/courses/${courseId}`)
      .then((response) => {
        // Update state with fetched data
        const { data } = response;
        setDescription(data.description);
      })
      .catch((error) => {
        console.error(error);
      });

    if (courseId !== "") socket.emit("join-course", courseId);

    socket.on("event", (event) => {
      setCalendarEventsData((prevEvents) => [...prevEvents, event]);
    });

    return () => {
      socket.emit("leave-course", courseId);
    };
  }, []);

  const handleSave = () => {
    setEditing(!editing);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox my={3}>
        <DLBox mb={3}>
          <Grid container spacing={3}>
            {auth.roles.includes(5150) ? (
              <Grid item xs={12} sm={6} lg={5}>
                <CourseEdit
                  courseId={courseId}
                  setEditing={setEditing}
                  editing={editing}
                  handleSave={handleSave}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} lg={5}>
                <TeacherInfo courseId={courseId} />
              </Grid>
            )}
            <Grid item xs={12} sm={6} lg={7}>
              <Card mb={2}>
                {auth.roles.includes(5150) ? (
                  editing ? (
                    <DLBox p={2}>
                      <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <DLTypography
                          component="label"
                          variant="h6"
                          fontWeight="medium"
                          color="text"
                        >
                          {t("descinfo")}
                        </DLTypography>
                      </DLBox>
                      <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                        <DLEditor value={description} onChange={setDescription} />
                      </DLBox>
                    </DLBox>
                  ) : (
                    <DLBox p={2}>
                      <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <DLTypography
                          component="label"
                          variant="h6"
                          fontWeight="medium"
                          color="text"
                        >
                          {t("descinfo")}
                        </DLTypography>
                      </DLBox>
                      <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                        <DLTypography
                          color="text"
                          variant="body2"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </DLBox>
                    </DLBox>
                  )
                ) : (
                  <DLBox p={2}>
                    <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <DLTypography component="label" variant="h6" fontWeight="medium" color="text">
                        {t("descinfo")}
                      </DLTypography>
                    </DLBox>
                    <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                      <DLTypography
                        color="text"
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    </DLBox>
                  </DLBox>
                )}
              </Card>
            </Grid>
          </Grid>
        </DLBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(() => (
              <Calendar
                header={{ title: `${t("caltitle")}` }}
                initialView="dayGridMonth"
                events={calendarEventsData}
                eventClick={handleOpen}
                locale={t("callang")}
              />
            ))}
          </Grid>
          <Grid item xs={12} lg={3}>
            <UpcomingEvents events={nextEvents} courseId={courseId} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <UploadFile courseId={courseId} />
          </Grid>
        </Grid>
      </DLBox>
      <MembersList courseId={courseId} />
      <Footer />
    </DashboardLayout>
  );
}

export default CourseInfo;
