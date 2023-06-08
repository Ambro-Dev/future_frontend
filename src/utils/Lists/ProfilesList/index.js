import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const fetchProfilePictures = async () => {
      try {
        const urls = await Promise.all(
          profiles.map(async (profile) => {
            try {
              const response = await axiosPrivate.get(
                `/profile-picture/users/${profile.user}/picture`,
                {
                  responseType: "blob",
                }
              );
              return URL.createObjectURL(response.data);
            } catch (error) {
              showErrorNotification("Error fetching image:", error);
              return null;
            }
          })
        );

        if (isMounted) {
          // Check if the component is still mounted before updating the state
          setImageUrls(urls);
        }
      } catch (error) {
        showErrorNotification("Error fetching profile pictures:", error);
      }
    };

    fetchProfilePictures();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, [axiosPrivate, profiles]);

  const renderProfiles = profiles.map(({ name, description, user, action }, index) => (
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
          <DLButton
            onClick={() => {
              const messageUser = {
                id: user,
              };
              navigate("/chat", { state: messageUser });
            }}
            variant="text"
            color="info"
          >
            {action.label}
          </DLButton>
        ) : (
          <DLButton
            variant="text"
            onClick={() => {
              const messageUser = {
                id: user,
              };
              navigate("/chat", { state: messageUser });
            }}
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
