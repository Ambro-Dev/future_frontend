/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

import defaultPicture from "assets/images/default.png";
import MDAvatar from "components/MDAvatar";

const REACT_APP_SERVER_URL = "http://localhost:8080";

// Data

function OrderList() {
  const serverUrl = REACT_APP_SERVER_URL;
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const { data } = await axiosPrivate.get(`users/${auth.userId}/groups`, {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchGroupsData();
    const fetchUsersData = async () => {
      try {
        const { data } = await axiosPrivate.get("users", {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox my={3}>
          <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <MDBox display="flex">
              <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                filters&nbsp;
                <Icon>keyboard_arrow_down</Icon>
              </MDButton>
              {renderMenu}
              <MDBox ml={1}>
                <MDButton variant="outlined" color="dark">
                  <Icon>description</Icon>
                  &nbsp;export csv
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox>
            {users.length > 0 && groups.length > 0 && (
              <MDBox>
                {users &&
                  groups.map((group) => {
                    const groupStudents = group.studentIds.map((studentId) => {
                      const student = users.find((user) => user._id === studentId);
                      const photoUrl = student.picture
                        ? `${serverUrl}/${student.picture}`
                        : defaultPicture;
                      if (student) {
                        return {
                          picture: <MDAvatar src={photoUrl} size="sm" />,
                          name: student.name,
                          surname: student.surname,
                          studentNumber: student.studentNumber,
                        };
                      }
                    });

                    return (
                      <Card key={group._id}>
                        <MDBox mt={2} ml={2}>
                          <MDTypography variant="h4" fontWeight="bold">
                            Group: {group.name}
                          </MDTypography>
                        </MDBox>
                        <DataTable
                          table={{
                            columns: [
                              { Header: "picture", accessor: "picture", width: "10%" },
                              { Header: "name", accessor: "name" },
                              { Header: "surname", accessor: "surname" },
                              { Header: "studentNumber", accessor: "studentNumber" },
                              {
                                Header: "actions",
                                accessor: "actions",
                                Cell: ({ row }) => (
                                  <MDButton
                                    onClick={() => console.log(row.original)}
                                    disabled={row.original.studentNumber === auth.studentNumber}
                                  >
                                    Message
                                  </MDButton>
                                ),
                              },
                            ],
                            rows: groupStudents,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      </Card>
                    );
                  })}
              </MDBox>
            )}
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
