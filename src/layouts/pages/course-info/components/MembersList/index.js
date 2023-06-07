/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLButton from "components/DLButton";

// Distance Learning React utils
import DataTable from "utils/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import DLAvatar from "components/DLAvatar";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DLTypography from "components/DLTypography";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";

// Set up the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Data

function OrderList({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "memberslist" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);
  const { showErrorNotification } = useContext(ErrorContext);

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
        const tableData = data.map((user) => ({
          id: user._id,
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
        }));
        setListUsers(tableData);
        Promise.all(
          data.map((user) =>
            axiosPrivate
              .get(`/profile-picture/users/${user._id}/picture`, {
                responseType: "blob",
              })
              .then((response) => URL.createObjectURL(response.data))
              .catch((error) => {
                showErrorNotification("Error", error.message);
                return null;
              })
          )
        ).then(setImageUrls);
        setCsvList(processedData);
      } catch (error) {
        showErrorNotification("Error", error.message);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const tableData = users.map((user, index) => ({
      id: user._id,
      name: user.name,
      surname: user.surname,
      studentNumber: user.studentNumber,
      picture: imageUrls[index],
    }));
    setListUsers(tableData);
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
    <DLBox>
      <DLBox my={3}>
        <DLBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <DLBox display="flex">
            <DLBox ml={1}>
              <DLButton
                variant="outlined"
                color="dark"
                onClick={() => exportCSV(csvList)}
                disabled={listUsers.length === 0}
              >
                <Icon>description</Icon>
                &nbsp;{t("exportcsv")}
              </DLButton>
            </DLBox>
            <DLBox ml={1}>
              <DLButton
                variant="outlined"
                color="dark"
                onClick={handlePdfExport}
                disabled={listUsers.length === 0}
              >
                <Icon>picture_as_pdf</Icon>
                &nbsp;{t("exportpdf")}
              </DLButton>
            </DLBox>
          </DLBox>
        </DLBox>
        <DLBox>
          <DLBox>
            <Card>
              <DLBox pt={2} px={2} lineHeight={1}>
                <DLTypography variant="h6" fontWeight="medium">
                  {t("members")}
                </DLTypography>
              </DLBox>
              <DataTable
                table={{
                  columns: [
                    {
                      Header: [t("picture")],
                      accessor: "picture",
                      width: "10%",
                      Cell: ({ row }) => (
                        <DLAvatar
                          src={row.original.picture}
                          size="sm"
                          alt={`${row.original.name} ${row.original.surname}`}
                          sx={{ color: "#000000" }}
                        />
                      ),
                    },
                    { Header: [t("name")], accessor: "name" },
                    { Header: [t("surname")], accessor: "surname" },
                    { Header: [t("studentnumber")], accessor: "studentNumber" },
                    {
                      Header: [t("actions")],
                      accessor: "actions",
                      Cell: ({ row }) => (
                        <DLButton
                          onClick={() => {
                            const messageUser = {
                              id: row.original.id,
                            };
                            navigate("/chat", { state: messageUser });
                          }}
                          disabled={row.original.studentNumber === auth.studentNumber}
                        >
                          {t("message")}
                        </DLButton>
                      ),
                    },
                  ],
                  rows: listUsers,
                }}
                canSearch
              />
            </Card>
          </DLBox>
        </DLBox>
      </DLBox>
    </DLBox>
  );
}

OrderList.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderList;
