/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React utils
import DefaultItem from "utils/Items/DefaultItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function NextEvents({ events }) {
  const [language, setLanguage] = useState("pl");
  const { i18n } = useTranslation();
  const { t } = useTranslation("translation", { keyPrefix: "calendar" });

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Card sx={{ height: "600px" }}>
      <DLBox
        pt={2}
        px={2}
        pb={1}
        lineHeight={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <DLTypography variant="h6" fontWeight="medium" pt={1}>
          {t("nextevents")}
        </DLTypography>
      </DLBox>
      <DLBox sx={{ overflow: "auto" }}>
        {events && events.length > 0 ? (
          events.map((event, index) => {
            const formattedStartDate = new Date(event.start).toLocaleDateString([t("date")], {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedStartTime = new Date(event.start).toLocaleTimeString([t("date")], {
              hour: "numeric",
              minute: "numeric",
              hour12: language === "en",
            });
            const formattedEndDate = new Date(event.end).toLocaleDateString([t("date")], {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedEndTime = new Date(event.end).toLocaleTimeString([t("date")], {
              hour: "numeric",
              minute: "numeric",
              hour12: language === "en",
            });
            return (
              <DLBox key={event._id}>
                <DefaultItem
                  color="dark"
                  type={event.className}
                  title={event.title}
                  description={`${formattedStartDate}, ${formattedStartTime}`}
                  eventdescription={event.description}
                  url={event.url}
                  index={index}
                  classname={event.className}
                  event={event.id}
                  start={`${formattedStartDate}, ${formattedStartTime}`}
                  end={`${formattedEndDate}, ${formattedEndTime}`}
                />
              </DLBox>
            );
          })
        ) : (
          <DLBox p={2}>{t("noevents")}</DLBox>
        )}
      </DLBox>
    </Card>
  );
}

NextEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      description: PropTypes.string,
      _id: PropTypes.string,
      url: PropTypes.string,
      className: PropTypes.string,
    })
  ).isRequired,
};

export default NextEvents;
