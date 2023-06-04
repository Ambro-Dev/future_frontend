/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, image, title, dateTime, description, members, dropdown }) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <DLAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <DLBox p={2}>
        <DLBox display="flex" alignItems="center">
          <DLAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
          />
          <DLBox ml={2} mt={-2} lineHeight={0}>
            <DLTypography variant="h6" textTransform="capitalize" fontWeight="medium">
              {title}
            </DLTypography>
            {members.length > -1 ? <DLBox display="flex">{renderMembers}</DLBox> : null}
          </DLBox>
          {dropdown && (
            <DLTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                more_vert
              </Icon>
            </DLTypography>
          )}
          {dropdown.menu}
        </DLBox>
        <DLBox my={2} lineHeight={1}>
          <DLTypography variant="button" fontWeight="light" color="text">
            {description}
          </DLTypography>
        </DLBox>
        <Divider />
        <DLBox display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <DLBox display="flex" flexDirection="column" lineHeight={0}>
              <DLTypography variant="button" fontWeight="medium">
                {members.length}
              </DLTypography>
              <DLTypography variant="button" fontWeight="regular" color="secondary">
                Participants
              </DLTypography>
            </DLBox>
          ) : null}
          {dateTime ? (
            <DLBox display="flex" flexDirection="column" lineHeight={0}>
              <DLTypography variant="button" fontWeight="medium">
                {dateTime}
              </DLTypography>
              <DLTypography variant="button" fontWeight="regular" color="secondary">
                Due date
              </DLTypography>
            </DLBox>
          ) : null}
        </DLBox>
      </DLBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
