/* eslint-disable no-underscore-dangle */
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
import PropTypes from "prop-types";

import MDAvatar from "components/MDAvatar";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Set up the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Data

function OrderList({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "memberslist" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);

  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
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
        const { data } = await axiosPrivate.get(`courses/${courseId}/members`, {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        setUsers(data);
        const processedData = data.map((user) => ({
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
        }));
        Promise.all(
          data.map((user) =>
            axiosPrivate
              .get(`/profile-picture/users/${user._id}/picture`, {
                responseType: "blob",
              })
              .then((response) => URL.createObjectURL(response.data))
              .catch((error) => {
                console.error("Error fetching image:", error);
                return null;
              })
          )
        ).then(setImageUrls);
        setCsvList(processedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length === imageUrls.length) {
      try {
        const tableData = users.map((user, index) => ({
          id: user._id,
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
          picture: imageUrls[index],
        }));
        setListUsers(tableData);
      } catch (error) {
        console.error(error);
      }
    }
  }, [imageUrls]);

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

  return (
    <MDBox>
      {listUsers && listUsers.length > 0 ? (
        <MDBox my={3}>
          <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <MDBox display="flex">
              <MDBox ml={1}>
                <MDButton variant="outlined" color="dark" onClick={() => exportCSV(csvList)}>
                  <Icon>description</Icon>
                  &nbsp;{t("exportcsv")}
                </MDButton>
              </MDBox>
              <MDBox ml={1}>
                <MDButton variant="outlined" color="dark" onClick={handlePdfExport}>
                  <Icon>picture_as_pdf</Icon>
                  &nbsp;{t("exportpdf")}
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
                      {t("members")}
                    </MDTypography>
                  </MDBox>
                  <DataTable
                    table={{
                      columns: [
                        {
                          Header: [t("picture")],
                          accessor: "picture",
                          width: "10%",
                          Cell: ({ row }) => <MDAvatar src={row.original.picture} size="sm" />,
                        },
                        { Header: [t("name")], accessor: "name" },
                        { Header: [t("surname")], accessor: "surname" },
                        { Header: [t("studentnumber")], accessor: "studentNumber" },
                        {
                          Header: [t("actions")],
                          accessor: "actions",
                          Cell: ({ row }) => (
                            <MDButton
                              onClick={() => navigate("/chat")}
                              disabled={row.original.studentNumber === auth.studentNumber}
                            >
                              {t("message")}
                            </MDButton>
                          ),
                        },
                      ],
                      rows: listUsers,
                    }}
                    entriesPerPage={false}
                    canSearch
                  />
                </Card>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      ) : (
        <MDBox>{t("stillloading")}</MDBox>
      )}
    </MDBox>
  );
}

OrderList.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderList;
