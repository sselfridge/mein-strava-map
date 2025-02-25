import React from "react";
import PropTypes from "prop-types";

import makeStyles from '@mui/styles/makeStyles';

import HeaderRight from "./HeaderRight";

// eslint-disable-next-line no-unused-vars
import { apiTest, apiTestReset, kickoffQ } from "../../api/strava";

const useStyles = makeStyles((theme) => ({
  Header: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    maxHeight: 50,
  },
  title: {
    fontSize: "2em",
    fontWeight: 800,
    marginLeft: "40%",
  },
  betaText: {
    fontSize: ".6em",
    color: "#FC4C02",
  },
  headerRight: {
    alignSelf: "flex-end",
  },
}));

// eslint-disable-next-line no-undef
const version = process.env.REACT_APP_GIT_HASH;

const Header = (props) => {
  const { currentUser } = props;
  const classes = useStyles();

  const isMe = currentUser.athleteId === 1075670;

  const kickoff = (
    <div>
      <button onClick={kickoffQ}>Start Q</button>{" "}
      <button onClick={apiTest}>TEST</button>
      <button onClick={apiTestReset}>RESET</button>
    </div>
  );

  return (
    <div className={classes.Header}>
      {isMe && kickoff}
      <div className={classes.title}>
        Mapper.Bike{" "}
        <span className={classes.betaText}>beta {`v-${version}`}</span>
      </div>
      <div className={classes.headerRight}>
        <HeaderRight {...props} />
      </div>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Header;
