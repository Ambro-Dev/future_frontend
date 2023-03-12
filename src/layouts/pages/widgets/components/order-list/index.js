/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

import MDAvatar from "components/MDAvatar";
import { Grid } from "@mui/material";

const REACT_APP_SERVER_URL = "http://localhost:8080";

// Data

function OrderList() {
  const serverUrl = REACT_APP_SERVER_URL;

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("courses/63e98a3f2d8af2d329d36602/members", {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (!loading) {
    return (
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox display="flex">
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {users.length > 0 && (
            <MDBox>
              <Card>
                <DataTable
                  table={{
                    columns: [
                      {
                        Header: "picture",
                        accessor: "picture",
                        width: "10%",
                        Cell: ({ row }) => (
                          <MDAvatar src={`${serverUrl}/${row.original.picture}`} size="sm" />
                        ),
                      },
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
                    rows: users,
                  }}
                  entriesPerPage={false}
                  canSearch
                />
              </Card>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    );
  }
  return <Grid>Loading</Grid>;
}

export default OrderList;
