/* eslint-disable no-underscore-dangle */
import DLBox from "components/DLBox";
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Model, Serializer } from "survey-core";
import { Survey } from "survey-react-ui";

// Add a custom `score` property to survey questions
Serializer.addProperty("question", {
  name: "score:number",
});

function SurveyViewer() {
  const axiosPrivate = useAxiosPrivate();
  const [exam, setExam] = useState();
  const { auth } = useAuth();
  const location = useLocation();
  const sendEvent = location.state;
  const [resultExam, setResultExam] = useState();
  const navigate = useNavigate();

  const saveResult = (sender, options) => {
    axiosPrivate
      .put(`/events/exam/${exam._id}/results`, { userId: auth.userId, json: sender.data })
      .then(() => {
        // Display the "Success" message (pass a string value to display a custom message)
        options.showSaveSuccess();
        // Alternatively, you can clear all messages:
        // options.showDataSavingClear();
      })
      .catch(() => {
        // Display the "Error" message (pass a string value to display a custom message)
        options.showSaveError();
      });
  };

  useEffect(() => {
    if (!sendEvent) {
      navigate("/profile/profile-overview");
    } else {
      axiosPrivate
        .get(`/events/exam/${sendEvent._id}`)
        .then((response) => {
          setExam(response?.data);
          const data = response?.data;
          if (data) {
            const resultData = data.results.find((result) => result.userId === auth.userId);
            setResultExam(resultData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const survey = new Model(exam?.json);

  survey.sendResultOnPageNext = true;

  const calculateMaxScore = (questions) => {
    let maxScore = 0;
    questions.forEach((question) => {
      if (question.score) {
        maxScore += question.score;
      }
    });
    return maxScore;
  };
  const calculateTotalScore = (data) => {
    let totalScore = 0;
    Object.keys(data).forEach((qName) => {
      const question = survey.getQuestionByValueName(qName);
      if (question.isAnswerCorrect()) {
        if (question.score) {
          totalScore += question.score;
        }
      }
    });
    return totalScore;
  };

  survey.onComplete.add((sender, options) => {
    const totalScore = calculateTotalScore(sender.data);
    const maxScore = calculateMaxScore(sender.getAllQuestions());

    // Save the scores in survey results
    sender.setValue("maxScore", maxScore);
    sender.setValue("totalScore", totalScore);
    sender.setValue("completed", true);
    // Display the "Saving..." message (pass a string value to display a custom message)
    options.showSaveInProgress();
    saveResult(sender, options);
  });

  survey.onPartialSend.add((sender, options) => {
    const totalScore = calculateTotalScore(sender.data);
    const maxScore = calculateMaxScore(sender.getAllQuestions());

    // Save the scores in survey results
    sender.setValue("maxScore", maxScore);
    sender.setValue("totalScore", totalScore);
    // Display the "Saving..." message (pass a string value to display a custom message)
    options.showSaveInProgress();
    saveResult(sender, options);
  });

  // Render the survey inside the page
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {resultExam?.json?.completed ? (
        <DLBox>You alredy completed this quiz</DLBox>
      ) : (
        <Survey model={survey} />
      )}
    </DashboardLayout>
  );
}

export default SurveyViewer;
