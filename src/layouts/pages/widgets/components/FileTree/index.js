/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function renderTreeItem(item) {
  if (item.type === "directory") {
    return (
      <TreeView key={item.name} nodeLabel={item.name} defaultCollapsed>
        {item.children.map((child) => renderTreeItem(child))}
      </TreeView>
    );
  }
  return (
    <MDBox
      key={item.name}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
    >
      {item.name}
    </MDBox>
  );
}

function FileTree() {
  const [treeData, setTreeData] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/courses/63e98a3f2d8af2d329d36602/filetree")
      .then((response) => {
        // Update state with fetched data
        setTreeData([response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} lineHeight={1}>
        <MDTypography variant="h6" fontWeight="medium">
          Files
        </MDTypography>
      </MDBox>
      {treeData.length > 0 ? (
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={2}
          className="treeview"
        >
          {treeData.map((item) => renderTreeItem(item))}
        </MDBox>
      ) : (
        <MDBox>No files yet</MDBox>
      )}
    </Card>
  );
}

export default FileTree;
