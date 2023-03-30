import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

function ProfilesList({ title, profiles, shadow }) {
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    Promise.all(
      profiles.map((profile) =>
        axiosPrivate
          .get(`/profile-picture/users/${profile.user}/picture`, {
            responseType: "blob",
          })
          .then((response) => URL.createObjectURL(response.data))
          .catch((error) => {
            console.error("Error fetching image:", error);
            return null;
          })
      )
    ).then(setImageUrls);
  }, [axiosPrivate, profiles]);

  const renderProfiles = profiles.map(({ name, description, action }, index) => (
    <MDBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar src={imageUrls[index]} alt="something here" shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {description}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        {action.type === "internal" ? (
          <MDButton component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </MDButton>
        ) : (
          <MDButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </MDButton>
        )}
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
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
