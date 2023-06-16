import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Icon, Tab } from "@mui/material";
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import { useState } from "react";

function LoginsTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const renderAuthData = (title, user, password) => (
    <>
      <DLBox display="flex" justifyContent="space-between" alignItems="center">
        <DLTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </DLTypography>
      </DLBox>
      <DLBox>
        <DLBox opacity={0.3}>
          <Divider />
        </DLBox>
        <DLBox>
          <DLBox display="flex">
            <DLTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Login: &nbsp;
            </DLTypography>
            <DLTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{user}
            </DLTypography>
          </DLBox>
        </DLBox>
        <DLBox>
          <DLBox display="flex">
            <DLTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Password: &nbsp;
            </DLTypography>
            <DLTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{password}
            </DLTypography>
          </DLBox>
        </DLBox>
      </DLBox>
    </>
  );

  return (
    <TabContext value={value}>
      <DLBox sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab icon={<Icon fontSize="medium">person</Icon>} value="1" />
          <Tab icon={<Icon fontSize="medium">school</Icon>} value="2" />
          <Tab icon={<Icon fontSize="medium">admin_panel_settings</Icon>} value="3" />
        </TabList>
      </DLBox>
      <TabPanel value="1">
        {renderAuthData("Student", "rajner.sawa@test.com", "VcHn#eKa2")}
      </TabPanel>
      <TabPanel value="2">
        {renderAuthData("Teacher", "tristan.krzyminski@test.com", "YHtBu4KC")}
      </TabPanel>
      <TabPanel value="3">{renderAuthData("Admin", "noemi.wojtala@test.com", "ZQqVxRaU")}</TabPanel>
    </TabContext>
  );
}

export default LoginsTabs;
