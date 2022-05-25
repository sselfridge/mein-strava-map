import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import config from "../../config/keys";

import { getDemoData, DEMO_USER } from "../../api/strava";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stravaImg: {
    width: "99%",
  },
  demoBtn: {
    display: "flex",
    flexDirection: "column",
  },
  demoText: {
    textAlign: "center",
  },
}));

const DefaultSidebar = (props) => {
  const classes = useStyles();
  const { setLoading, setActivities, snackBar, setCurrentUser } = props;

  function setDemo() {
    setLoading(true);

    getDemoData()
      .then((result) => {
        setActivities(result);
        setCurrentUser(DEMO_USER);
      })
      .catch((err) => {
        console.error("Get Activities Error:", err);
        snackBar();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  let connectToStravaLink = "";
  connectToStravaLink += `https://www.strava.com/oauth/authorize`;
  connectToStravaLink += `?client_id=${config.client_id}`;
  connectToStravaLink += `&redirect_uri=${config.callback_uri}/api/strava/callback`;
  connectToStravaLink += `&response_type=code`;
  connectToStravaLink += `&approval_prompt=auto`;
  connectToStravaLink += `&scope=read_all,activity:read_all`;

  return (
    <div className={classes.root}>
      <div>
        <a href={connectToStravaLink}>
          <img
            className={classes.stravaImg}
            src="img/connectStrava.png"
            alt="connect with Strava"
          />
        </a>
        <section className={classes.demoText}>
          We will not share your data with anyone, delete yourself anytime from
          our{" "}
          <span title="As if there were more than one...there is not">
            servers
          </span>
        </section>
      </div>
      <div className={classes.demoBtn}>
        <section>Want to try it out without linking your Strava?</section>
        <Button id="demoBtn" variant={"contained"} onClick={setDemo}>
          Click Here To Load Demo data
        </Button>
      </div>
    </div>
  );
};

DefaultSidebar.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setActivities: PropTypes.func.isRequired,
  snackBar: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default DefaultSidebar;
