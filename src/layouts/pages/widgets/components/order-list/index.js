/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDTypography from "components/MDTypography";

const REACT_APP_SERVER_URL = "http://localhost:8080";

// Set up the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Data

function OrderList() {
  const serverUrl = REACT_APP_SERVER_URL;

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvList, setCsvList] = useState();

  const docDefinition = {
    content: [
      { text: "Users List", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          body: [
            ["Name", "Surname", "Student Number"],
            ...users.map((user) => [user.name, user.surname, user.studentNumber]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("courses/63e98a3f2d8af2d329d36602/members", {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        const processedData = data.map((user) => ({
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
        }));
        setCsvList(processedData);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handlePdfExport = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("users.pdf");
  };

  function exportCSV(tableData) {
    const separator = ",";
    const keys = Object.keys(tableData[0]);
    const csvContent = `${keys.join(separator)}\n${tableData
      .map((row) =>
        keys
          .map((key) => {
            let cellData = row[key];
            cellData = cellData === null || cellData === undefined ? "" : cellData.toString();
            cellData = cellData.includes(separator) ? `"${cellData}"` : cellData;
            return cellData;
          })
          .join(separator)
      )
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!loading) {
    return (
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox display="flex">
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark" onClick={() => exportCSV(csvList)}>
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark" onClick={handlePdfExport}>
                <Icon>picture_as_pdf</Icon>
                &nbsp;Export PDF
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {users.length > 0 && (
            <MDBox>
              <Card>
                <MDBox pt={2} px={2} lineHeight={1}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Members
                  </MDTypography>
                </MDBox>
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
