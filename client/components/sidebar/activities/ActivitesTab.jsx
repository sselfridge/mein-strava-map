import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ReactLoading from "react-loading";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getActivities, apiTest } from "../../../api/strava";
import List from "./List";

import ControlPanel from "./ControlPanel";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    height: "87.5vh",
    backgroundColor: "#aadaff",
  },
  fillerText: {
    textAlign: "center",
  },
  loadingText: {
    position: "relative",
    textAlign: "center",
    top: -150,
  },
}));

const calcAfterDate = () => {
  const now = new Date();
  const afterDate = new Date();
  afterDate.setMonth(now.getMonth() - 2);
  return afterDate;
};

const calcDateDiff = (after, before) => {
  if (before === null) before = new Date();
  const diff = before - after;
  const days = Math.floor(diff / 86400000);
  return days > 2000 ? "2000+" : days;
};

const secFromTimer = (timer) => {
  const diff = moment() - timer;
  return Math.floor(diff / 1000);
};

const showDots = (loadingDots) => {
  return ".".repeat(loadingDots);
};

export default function ActivitiesTab(props) {
  const classes = useStyles();

  const {
    setActivities,
    activities,
    handleSelected,
    selectedAct,
    setMapCenter,
    setLoading,
    loading,
    handleRemoveActivity,
    snackBar,
  } = props;

  const [beforeDate, setBefore] = useState(new Date());
  const [afterDate, setAfter] = useState(calcAfterDate());
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [loadingTimer, setLoadingTimer] = useState(moment());
  const [loadingDots, setLoadingDots] = useState(3);
  const [activityType, setActivityType] = useState({
    Ride: true,
    VirtualRide: false,
    Run: false,
    Other: false,
  });

  const onAfterChange = (newDate) => setAfter(newDate);
  const onBeforeChange = (newDate) => setBefore(newDate);

  function fetchActivities() {
    setLoadingTimer(moment());
    setLoading(true);

    getActivities(activityType, afterDate, beforeDate)
      .then((result) => {
        setActivities(result);
      })
      .catch((err) => {
        console.error("Get Activites Error:", err);
        snackBar("Error getting Rides, try again later", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading === true) {
    setTimeout(() => {
      const dots = (loadingDots + 1) % 4;
      setLoadingDots(dots);
    }, 1000);
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel id="controlPanel" expanded={panelExpanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setPanelExpanded(!panelExpanded)}
        >
          <Typography className={classes.heading}>Map Filter / Controls</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ControlPanel
            fetchActivities={fetchActivities}
            afterDate={afterDate}
            beforeDate={beforeDate}
            onAfterChange={onAfterChange}
            onBeforeChange={onBeforeChange}
            activityType={activityType}
            setActivityType={setActivityType}
            {...props}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <button onClick={apiTest}>TEST</button>
      {loading && (
        <div>
          <ReactLoading type="spinningBubbles" color="#FC4C02" width="100%" height={"300px"} />
          <div className={classes.loadingText}>
            <div>Loading....</div>
            <div>Allow ~5 seconds for every 200 activities</div>
            <div>{`Your search covers ${calcDateDiff(afterDate, beforeDate)} days`}</div>
            <div>{`${secFromTimer(loadingTimer)} secs elapsed`}</div>
            <div>{`${showDots(loadingDots)}`}</div>
          </div>
        </div>
      )}
      {!activities[0] && !loading && (
        <div className={classes.fillerText}>{"Click 'GET RIDES' to populate map"}</div>
      )}
      <List
        activities={activities}
        loading={loading}
        panelExpanded={panelExpanded}
        handleSelected={handleSelected}
        selectedAct={selectedAct}
        setMapCenter={setMapCenter}
        handleRemoveActivity={handleRemoveActivity}
      />
    </div>
  );
}

ActivitiesTab.propTypes = {
  activities: PropTypes.array.isRequired,
  setActivities: PropTypes.func.isRequired,
  handleSelected: PropTypes.func.isRequired,
  selectedAct: PropTypes.object.isRequired,
  setMapCenter: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleRemoveActivity: PropTypes.func.isRequired,
  snackBar: PropTypes.func.isRequired,
};
