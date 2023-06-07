import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React base styles
import breakpoints from "assets/theme/base/breakpoints";
import useAuth from "hooks/useAuth";

import backgroundImage from "assets/images/bg-profile.jpeg";
import DLAvatar from "components/DLAvatar";
import useAxiosPrivate from "hooks/useAxiosPrivate";

// Images

function Header({ children }) {
  const axiosPrivate = useAxiosPrivate();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { auth } = useAuth();
  const [imageIrl, setImageUrl] = useState();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setImageUrl(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <DLBox position="relative" mb={5}>
      <DLBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 1,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <DLAvatar src={imageIrl} alt={`${auth.name} ${auth.surname}`} size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <DLBox height="100%" mt={0.5} lineHeight={1}>
              <DLTypography variant="h5" fontWeight="medium">
                {auth.name} {auth.surname}
              </DLTypography>
              {auth.studentNumber && (
                <DLTypography variant="button" color="text" fontWeight="regular">
                  {auth.studentNumber}
                </DLTypography>
              )}
            </DLBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </DLBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
