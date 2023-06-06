/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLBadge from "components/DLBadge";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";
import DLProgress from "components/DLProgress";

// Custom styles for the Card

function Card({ image, badge, content, progress, attachedFiles, members }) {
  const renderMembers = members.map((member, key) => {
    const imageAlt = `image-${key}`;

    return (
      <DLAvatar
        key={imageAlt}
        src={member}
        alt={imageAlt}
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1,
          mr: 0,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    );
  });

  return (
    <>
      {image && <DLBox component="img" src={image} width="100%" borderRadius="lg" mb={1} />}
      <DLBadge size="xs" color={badge.color} badgeContent={badge.label} container />
      <DLBox mt={1} mb={2}>
        <DLTypography variant="body2" color="text">
          {content}
        </DLTypography>
        {progress > 0 && (
          <DLBox mt={0.25}>
            <DLProgress variant="gradient" value={progress} color={badge.color} />
          </DLBox>
        )}
      </DLBox>
      <DLBox display="flex" justifyContent="space-between" alignItems="center">
        <DLBox display="flex" alignItems="center" color="text">
          {attachedFiles && (
            <>
              <DLTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
                <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
              </DLTypography>
              <DLTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{attachedFiles}
              </DLTypography>
            </>
          )}
        </DLBox>
        <DLBox display="flex">{renderMembers}</DLBox>
      </DLBox>
    </>
  );
}

// Setting default props for the Card
Card.defaultProps = {
  image: "",
  progress: 0,
  attachedFiles: "",
};

// Typechecking props for the Card
Card.propTypes = {
  image: PropTypes.string,
  badge: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.node.isRequired,
  progress: PropTypes.number,
  attachedFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
