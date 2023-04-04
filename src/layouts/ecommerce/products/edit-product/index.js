/* eslint-disable no-underscore-dangle */
import PageLayout from "examples/LayoutContainers/PageLayout";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormCreatorRenderComponent from "./components/FormCreatorComponent";
import examJSON from "./form_json";

function ExamBuilder() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();
  const sendEvent = location.state;
  const [surveyId, setSurveyId] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [surveyJSON, setSurveyJSON] = useState(examJSON);

  useEffect(() => {
    if (!sendEvent) {
      navigate("/profile/profile-overview");
    } else {
      setLoading(true);
      axiosPrivate
        .get(`/events/exam/${sendEvent._id}`)
        .then((response) => {
          setSurveyId(response?.data?._id);
          if (response?.data?.json) {
            setSurveyJSON(response?.data?.json);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const saveSurvey = (survey, saveNo, callback) => {
    const surveyData = {
      title: survey.survey.title,
      json: survey.JSON,
      event: sendEvent._id,
      teacher: auth.userId,
    };

    if (surveyId) {
      axiosPrivate
        .put(`/events/exam/${surveyId}`, surveyData)
        .then(() => {
          callback(saveNo, true);
        })
        .catch(() => {
          callback(saveNo, false);
        });
    } else {
      axiosPrivate
        .post("/events/exam/create", surveyData)
        .then((response) => {
          setSurveyId(response.data._id);
          callback(saveNo, true);
        })
        .catch(() => {
          callback(saveNo, false);
        });
    }
  };

  return (
    <PageLayout>
      {loading && <FormCreatorRenderComponent saveSurvey={saveSurvey} surveyJSON={surveyJSON} />}
    </PageLayout>
  );
}

export default ExamBuilder;
