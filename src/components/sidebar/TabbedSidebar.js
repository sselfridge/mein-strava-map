import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, AppBar, Tabs, Tab } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import ActivitiesTab from "./activities/ActivitiesTab.jsx";
import EffortsTab from "./efforts/EffortsTab.jsx";

import { getUser } from "../../api/strava";
import UserAgreement from "./UserAgreement.js";
import PremiumOnly from "./PremiumOnly";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  premiumIcon: {
    height: 24,
    width: 24,
    marginRight: 24,
  },
  premiumTab: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabbedSidebar(props) {
  const classes = useStyles();

  const { setMapLines, activities, filteredEfforts, currentUser } = props;

  const [activeTab, setActiveTab] = useState(0);
  const [userAgreed, setUserAgreed] = useState(false);

  const [renderKomTab, setRenderKomTab] = useState(0);

  const [userInitialized, setUserInitialized] = useState(false);

  const premium = currentUser.premium;

  const handleChange = (event, newValue) => {
    syncLines(newValue);
    setActiveTab(newValue);
  };

  const syncLines = useCallback(
    (tabIndex) => {
      switch (tabIndex) {
        case 0:
          setMapLines(activities);
          break;
        case 1:
          setMapLines(filteredEfforts);
          break;

        default:
          throw new Error("Invalid Tab Received: ", tabIndex);
      }
    },
    [activities, filteredEfforts, setMapLines]
  );

  useEffect(() => {
    syncLines(activeTab);
  }, [activities, filteredEfforts, syncLines, activeTab]);

  useEffect(() => {
    const id = currentUser.athleteId;
    getUser(id).then((user) => {
      if (user) setUserInitialized(true);
    });
  }, [currentUser]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          textColor="black"
          indicatorColor="secondary"
        >
          <Tab label="Activities" {...a11yProps(0)} />
          <Tab
            label="KOM Mapper "
            icon={
              <img
                className={classes.premiumIcon}
                src="img/premium.png"
                alt="Strava Premium"
              />
            }
            className={classes.premiumTab}
            onClick={() => setRenderKomTab((r) => r + 1)}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <ActivitiesTab {...props} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {!premium ? (
          <PremiumOnly />
        ) : userInitialized ? (
          <EffortsTab {...props} renderKomTab={renderKomTab} />
        ) : (
          <UserAgreement
            userAgreed={userAgreed}
            setUserAgreed={setUserAgreed}
          />
        )}
      </TabPanel>
    </div>
  );
}

TabbedSidebar.propTypes = {
  setMapLines: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  filteredEfforts: PropTypes.array.isRequired,
  currentUser: PropTypes.shape({
    athleteId: PropTypes.number,
    premium: PropTypes.bool,
  }),
};
