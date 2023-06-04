/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Card } from "@mui/material";
import DLBox from "components/DLBox";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import DLTypography from "components/DLTypography";
import PropTypes from "prop-types";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 34, height: 34 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path
        d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"
        fill="blue"
      />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 34, height: 34 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path
        d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
        fill="blue"
      />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 34, height: 34 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path
        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
        fill="blue"
      />
    </SvgIcon>
  );
}

function TransitionComponent({ in: inProp, ...rest }) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: inProp ? 1 : 0,
      transform: `translate3d(${inProp ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse in={inProp} {...rest} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool.isRequired,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function renderTreeItem(item) {
  if (item.type === "directory") {
    return (
      <StyledTreeItem key={item.name} nodeId={item.name} label={item.name}>
        {item.children.map((child) => renderTreeItem(child))}
      </StyledTreeItem>
    );
  }
  return <StyledTreeItem key={item.name} nodeId={item.name} label={item.name} />;
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
        console.error(error);
      });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <DLBox pt={2} px={2} lineHeight={1}>
        <DLTypography variant="h6" fontWeight="medium">
          Files
        </DLTypography>
      </DLBox>
      {treeData.length > 0 ? (
        <TreeView
          aria-label="customized"
          defaultExpanded={["1"]}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto", pl: 2, pt: 2 }}
        >
          {treeData.map((item) => renderTreeItem(item))}
        </TreeView>
      ) : (
        <DLBox>No files yet</DLBox>
      )}
    </Card>
  );
}

export default FileTree;
