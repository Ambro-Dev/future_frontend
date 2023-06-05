import { Card, CircularProgress, Icon } from "@mui/material";
import DLBox from "components/DLBox";
import DLProgress from "components/DLProgress";
import DLTypography from "components/DLTypography";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function CourseFiles() {
  const [progress, setProgress] = useState(null);
  const [allFiles, setAllFiles] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("files").then((response) => {
      setAllFiles(response.data);
      const spaceTaken = response.data.totalDiskSpace;
      if (!spaceTaken || spaceTaken === 0) return;
      const progressAmount = (spaceTaken / (1024 * 1024) / 400) * 100;
      const kB = spaceTaken;
      const MB = (spaceTaken / 1024).toFixed(2);
      const GB = (spaceTaken / (1024 * 1024)).toFixed(2);
      if (spaceTaken < 1024 && spaceTaken > 0)
        setProgress({ value: kB, amount: progressAmount, metric: "kB" });
      if (spaceTaken < 1024 * 1024 && spaceTaken > 1024)
        setProgress({ value: MB, amount: progressAmount, metric: "MB" });
      if (spaceTaken < 1024 * 1024 * 1024 && spaceTaken > 1024 * 1024)
        setProgress({ value: GB, amount: progressAmount, metric: "GB" });
    });
  }, []);

  return (
    <Card sx={{ marginTop: 2 }}>
      {allFiles ? (
        <DLBox p={3}>
          <DLBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor="info"
            color="white"
            width="3rem"
            height="3rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            <Icon fontSize="default">description</Icon>
          </DLBox>
          <DLBox mt={2.625}>
            <DLTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Space taken by course files
            </DLTypography>
            <DLBox display="flex" justifyContent="space-between">
              <DLTypography variant="body2" color="text" fontWeight="regular">
                {progress ? `${progress.value} ${progress.metric}` : "0 kB"}
              </DLTypography>
              <DLTypography variant="body2" color="text" fontWeight="regular">
                400 GB
              </DLTypography>
            </DLBox>
          </DLBox>
          <DLBox>
            <DLProgress value={progress ? progress.amount : 0} variant="contained" />
          </DLBox>
        </DLBox>
      ) : (
        <DLBox
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </DLBox>
      )}
    </Card>
  );
}

export default CourseFiles;
