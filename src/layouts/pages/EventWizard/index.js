/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useContext, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";

// Wizard page components
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { SocketContext } from "context/socket";
import DLSnackbar from "components/DLSnackbar";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import Account from "./components/Account";
import About from "./components/About";
import Address from "./components/Address";

function getSteps() {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  return [[t("step1")], [t("step2")], [t("step3")]];
}

function EventWizard() {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  const navigate = useNavigate();
  const { auth } = useAuth();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to the month since getMonth() returns 0-based index
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;
  const axiosPrivate = useAxiosPrivate();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const location = useLocation();
  const course = location.state;

  const [className, setClassName] = useState("success");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const { socket } = useContext(SocketContext);
  const [eventStartDate, setEventStartDate] = useState(formattedDate);
  const [eventStartTime, setEventStartTime] = useState("12:00");
  const [eventEndDate, setEventEndDate] = useState(formattedDate);
  const [eventEndTime, setEventEndTime] = useState("13:00");

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const renderSuccessSB = (
    <DLSnackbar
      color="success"
      icon="check"
      title="Event"
      content="Successfully created event"
      dateTime={`${dateNow} ${timeNow}`}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <DLSnackbar
      color="error"
      icon="warning"
      title="Event"
      content="Error creating event"
      dateTime={`${dateNow} ${timeNow}`}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const createEvent = (e) => {
    e.preventDefault();
    const eventStart = new Date(`${eventStartDate}T${eventStartTime}`);
    const eventEnd = new Date(`${eventEndDate}T${eventEndTime}`);
    const newEvent = {
      course: course.id,
      title: name,
      description,
      start: eventStart,
      end: eventEnd,
      className,
    };
    try {
      axiosPrivate.post("/events/create", newEvent).then((response) => {
        const eventId = response.data._id;
        if (className === "success") {
          const joinUrl = `${window.location.origin}/video-lesson/${eventId}`;
          axiosPrivate.put(`/events/${course.id}/update`, { event: eventId, url: joinUrl });
          const sendEvent = {
            course: course.id,
            title: name,
            description,
            start: eventStart,
            end: eventEnd,
            url: joinUrl,
            _id: eventId,
            className,
          };
          socket.emit("new-event", sendEvent);
          openSuccessSB();
          navigate(-1);
        } else {
          const sendEvent = {
            course: course.id,
            title: name,
            description,
            start: eventStart,
            end: eventEnd,
            _id: eventId,
            className,
          };
          socket.emit("new-event", sendEvent);
          openSuccessSB();
          navigate("/exam-pages/create-page", { state: sendEvent });
        }
      });
      setName("");
      setDescription("");
    } catch (error) {
      openErrorSB();
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Account setClassName={setClassName} />;
      case 1:
        return (
          <About
            setName={setName}
            name={name}
            description={description}
            setDescription={setDescription}
          />
        );
      case 2:
        return (
          <Address
            setEventStartDate={setEventStartDate}
            setEventEndDate={setEventEndDate}
            setEventEndTime={setEventEndTime}
            setEventStartTime={setEventStartTime}
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
            eventEndTime={eventEndTime}
            eventStartTime={eventStartTime}
          />
        );
      default:
        return null;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {auth.roles.includes(5150) ? (
        <DLBox pt={3} pb={8}>
          <Grid container justifyContent="center" sx={{ my: 4 }}>
            <Grid item xs={12} lg={8}>
              <DLBox mt={6} mb={8} textAlign="center">
                <DLBox mb={1}>
                  <DLTypography variant="h3" fontWeight="bold">
                    {t("build")}
                  </DLTypography>
                </DLBox>
                <DLTypography variant="h5" fontWeight="regular" color="secondary">
                  {t("info")}
                </DLTypography>
              </DLBox>
              <Card>
                <DLBox mt={-3} mx={2}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </DLBox>
                <DLBox p={2}>
                  <DLBox>
                    {getStepContent(activeStep)}
                    <DLBox mt={3} width="100%" display="flex" justifyContent="space-between">
                      {activeStep === 0 ? (
                        <DLBox />
                      ) : (
                        <DLButton variant="outlined" color="dark" onClick={handleBack}>
                          {t("back")}
                        </DLButton>
                      )}
                      {activeStep === 1 && (name === "" || description === "") ? (
                        <DLButton
                          variant="gradient"
                          color="dark"
                          onClick={!isLastStep ? handleNext : createEvent}
                          disabled
                        >
                          {isLastStep ? [t("send")] : [t("next")]}
                        </DLButton>
                      ) : (
                        <DLButton
                          variant="gradient"
                          color="dark"
                          onClick={!isLastStep ? handleNext : createEvent}
                        >
                          {isLastStep ? [t("send")] : [t("next")]}
                        </DLButton>
                      )}
                    </DLBox>
                  </DLBox>
                </DLBox>
              </Card>
              {renderErrorSB} {renderSuccessSB}
            </Grid>
          </Grid>
        </DLBox>
      ) : (
        <DLBox>{t("noaccess")}</DLBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default EventWizard;
