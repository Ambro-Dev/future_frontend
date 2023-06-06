/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";
import DLButton from "components/DLButton";

// Image
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function Header() {
  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <DLBox display="flex" alignItems="center">
      <DLBox mt={0.5} pr={1}>
        <DLBox mb={1} ml={-1.25} lineHeight={0}>
          <DLTypography variant="button" color="secondary">
            Team members:
          </DLTypography>
        </DLBox>
        <DLBox display="flex">
          <Tooltip title="Jessica Rowland" placement="top">
            <DLAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Audrey Love" placement="top">
            <DLAvatar src={team2} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Michael Lewis" placement="top">
            <DLAvatar src={team3} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Lucia Linda" placement="top">
            <DLAvatar src={team4} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Ronald Miller" placement="top">
            <DLAvatar src={team5} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
        </DLBox>
      </DLBox>
      <DLBox height="75%" alignSelf="flex-end">
        <Divider orientation="vertical" />
      </DLBox>
      <DLBox pl={1}>
        <DLButton variant="outlined" color="dark" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </DLButton>
      </DLBox>
    </DLBox>
  );
}

export default Header;
