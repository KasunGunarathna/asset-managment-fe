import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainTemplate from "../../templates/MainTemplate";
import { AppDispatch } from "../../store/store";
import { fetchLoginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../store/authSlice";
import Logo from "../../assets/logo.png";
import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { selectBridge } from "../../store/bridgeSlice";
import { bridgeSummery } from "../../services/bridgeService";
import { roadSummary } from "../../services/roadService";
import { drainageSummery } from "../../services/drainageService";
import { streetLightSummery } from "../../services/StreetLightService";

interface ItemWithIcons {
  text: string;
  path: string;
  data1Name?: string;
  data1Value?: string | number | null;
  data2Name?: string;
  data2Value?: Record<string, number> | null;
  data3Name?: string;
  data3Value?: Record<string, number> | null;
  image: string;
}

const HomePage = () => {
  const nic = sessionStorage.getItem("userNic");

  const dispatch = useDispatch<AppDispatch>();
  const { logUser } = useSelector(selectAuth);
  const [bridgeSummeryData, setBridgeSummeryData] = useState<any>(null);
  const [roadSummeryData, setRoadSummeryData] = useState<any>(null);
  const [drainageData, setDrainageSummeryData] = useState<any>(null);
  const [lightData, setLightSummeryData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchLoginUser(nic));
        const bridgeData = await dispatch(bridgeSummery());
        setBridgeSummeryData(bridgeData);
        const roadData = await dispatch(roadSummary());
        setRoadSummeryData(roadData);
        const drainageData = await dispatch(drainageSummery());
        setDrainageSummeryData(drainageData);
        const lightData = await dispatch(streetLightSummery());
        setLightSummeryData(lightData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nic) {
      fetchData();
    }
  }, [nic, dispatch]);

  const navigate = useNavigate();

  const navigateToRoute = (path: string) => {
    navigate(path);
  };

  const itemsWithIcons: ItemWithIcons[] = [
    {
      text: "Bridge and Culverts",
      path: "/bridges",
      image: Logo,
      data1Name: "Total Bridges",
      data1Value: bridgeSummeryData?.total,
      data2Name: "Surface Condition Base Counts",
      data2Value: bridgeSummeryData?.surfaceConditionCounts,
      data3Name: "Structure Condition Base Counts",
      data3Value: bridgeSummeryData?.structureConditionCounts,
    },
    {
      text: "Roads",
      path: "/roads",
      image: Logo,
      data1Name: "Total Roads",
      data1Value: roadSummeryData?.total,
      data2Name: "Surface Condition Base Counts",
      data2Value: roadSummeryData?.surfaceConditionCounts,
      data3Name: "Pavement Type Length Sum (Km)",
      data3Value: roadSummeryData?.pavementTypeCounts,
    },
    {
      text: "Drainages",
      path: "/street_lights",
      image: Logo,
      data1Name: "Total Drainages",
      data1Value: drainageData?.total,
      data2Name: "Drainage Type Base Counts",
      data2Value: drainageData?.drainageTypeCounts,
      data3Name: "Condition Base Counts",
      data3Value: drainageData?.conditionCounts,
    },
    {
      text: "Street Lights",
      path: "/street_lights",
      image: Logo,
      data1Name: "Total Bridges",
      data1Value: lightData?.total,
      data2Name: "Pole Type Base Counts",
      data2Value: lightData?.poleTypeCounts,
      data3Name: "Lamp Type Base Counts",
      data3Value: lightData?.lampTypeCounts,
    },
    // Add other items here
  ];

  return (
    <>
      <MainTemplate userDetails={logUser} breadCrumb={["Home", "Home"]}>
        <Typography
          variant="h4"
          component="div"
          fontWeight="bold"
          sx={{ flexGrow: 1, margin: "5px" }}
        >
          {"Welcome to Asset Management System"}
        </Typography>
        <Divider sx={{ marginBottom: "25px" }} />
        <Grid container spacing={1}>
          {logUser &&
            itemsWithIcons.map((item, index) => (
              <Grid item key={index}>
                <Paper
                  elevation={3}
                  className="paper-box"
                  sx={{
                    height: "auto",
                    width: "auto",
                    padding: "10px",
                    cursor: "pointer", // Add cursor pointer style
                  }}
                  onClick={() => navigateToRoute(item.path)}
                >
                  <ButtonBase>
                    <Box
                      sx={{
                        height: "auto",
                        width: "250px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h5"
                        align="left"
                        fontWeight="bold"
                        paddingBottom="10px"
                        sx={{
                          color: "#1776d6",
                          textDecoration: "underline",
                        }}
                      >
                        {item.text}
                      </Typography>
                      {item.data1Name && (
                        <Typography
                          variant="body1"
                          align="left"
                          fontWeight="bold"
                          paddingBottom="5px"
                        >
                          {`${item.data1Name}: ${item.data1Value}`}
                        </Typography>
                      )}
                      {item.data2Name && (
                        <Typography
                          variant="body2"
                          align="left"
                          fontWeight="bold"
                        >
                          {`${item.data2Name}`}
                          {item.data2Value &&
                            Object.entries(item.data2Value).map(
                              ([condition, count]) => (
                                <Typography
                                  key={condition}
                                  variant="body2"
                                  align="left"
                                  paddingLeft="20px"
                                  fontWeight="bold"
                                  sx={{
                                    color: "#1776d6",
                                  }}
                                >
                                  {`${condition}: ${count}`}
                                </Typography>
                              ),
                            )}
                        </Typography>
                      )}
                      {item.data3Name && (
                        <Typography
                          variant="body2"
                          align="left"
                          fontWeight="bold"
                        >
                          {`${item.data3Name}`}
                          {item.data3Value &&
                            Object.entries(item.data3Value).map(
                              ([condition, count]) => (
                                <Typography
                                  key={condition}
                                  variant="body2"
                                  align="left"
                                  paddingLeft="20px"
                                  fontWeight="bold"
                                  sx={{
                                    color: "#1776d6",
                                  }}
                                >
                                  {`${condition}: ${count}`}
                                </Typography>
                              ),
                            )}
                        </Typography>
                      )}
                    </Box>
                  </ButtonBase>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </MainTemplate>
    </>
  );
};

export default HomePage;
