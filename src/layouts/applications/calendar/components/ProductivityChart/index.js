/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useRef, useState, useMemo, useEffect } from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Chart configurations
import configs from "layouts/applications/calendar/components/ProductivityChart/configs";

// Distance Learning React base styles
import typography from "assets/theme/base/typography";

function ProductivityChart() {
  const { size } = typography;
  const chartRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [chart, setChart] = useState([]);
  const { data, options } = chart;

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  useEffect(() => {
    setChart(configs());
  }, []);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Anoter action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ overflow: "hidden" }}>
      <DLBox bgColor="dark" variant="gradient">
        <DLBox p={2}>
          <DLBox display="flex" justifyContent="space-between">
            <DLBox>
              <DLTypography variant="h6" fontWeight="medium" color="white">
                Productivity
              </DLTypography>
              <DLBox display="flex" alignItems="center">
                <DLBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                </DLBox>
                <DLTypography variant="button" color="white" fontWeight="medium">
                  4% more{" "}
                  <DLTypography variant="button" color="white">
                    in 2021
                  </DLTypography>
                </DLTypography>
              </DLBox>
            </DLBox>
            <DLTypography color="white" onClick={handleOpenMenu}>
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_horiz
              </Icon>
            </DLTypography>
            {renderMenu()}
          </DLBox>
        </DLBox>
        {useMemo(
          () => (
            <DLBox ref={chartRef} sx={{ height: "6.25rem" }}>
              <Line data={data} options={options} />
            </DLBox>
          ),
          [chart]
        )}
      </DLBox>
    </Card>
  );
}

export default ProductivityChart;
