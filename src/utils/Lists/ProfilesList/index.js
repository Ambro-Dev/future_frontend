import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";
import DLButton from "components/DLButton";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState, useEffect, useContext } from "react";
import ErrorContext from "context/ErrorProvider";

function ProfilesList({ title, profiles, shadow }) {
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);
  const { showErrorNotification } = useContext(ErrorContext);

  useEffect(() => {
    Promise.all(
      profiles.map((profile) =>
        axiosPrivate
          .get(`/profile-picture/users/${profile.user}/picture`, {
            responseType: "blob",
          })
          .then((response) => URL.createObjectURL(response.data))
          .catch((error) => {
            showErrorNotification("Error fetching image:", error);
            return null;
          })
      )
    ).then(setImageUrls);
  }, [axiosPrivate, profiles]);

  const renderProfiles = profiles.map(({ name, description, action }, index) => (
    <DLBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <DLBox mr={2}>
        <DLAvatar src={imageUrls[index]} alt="something here" shadow="md" />
      </DLBox>
      <DLBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <DLTypography variant="button" fontWeight="medium">
          {name}
        </DLTypography>
        <DLTypography variant="caption" color="text">
          {description}
        </DLTypography>
      </DLBox>
      <DLBox ml="auto">
        {action.type === "internal" ? (
          <DLButton component={Link} to="/chat" variant="text" color="info">
            {action.label}
          </DLButton>
        ) : (
          <DLButton
            component="a"
            href="/chat"
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </DLButton>
        )}
      </DLBox>
    </DLBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <DLBox pt={2} px={2}>
        <DLTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </DLTypography>
      </DLBox>
      <DLBox p={2}>
        <DLBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </DLBox>
      </DLBox>
    </Card>
  );
}

ProfilesList.defaultProps = {
  shadow: true,
};

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
