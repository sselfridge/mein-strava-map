import React from "react";
import PropTypes from "prop-types";

import makeStyles from '@mui/styles/makeStyles';

import Typography from "@mui/material/Typography";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  colorRank: {
    height: " 5px",
    width: "100%",
    position: "absolute",
    bottom: " 0px",
  },
}));

const RankFilter = (props) => {
  const { ranks, handleToggleRank, rankColors } = props;
  const classes = useStyles();

  const arr = new Array(10).fill("");

  const buttons = arr.map((num, index) => {
    return (
      <ToggleButton key={index} value={index + 1} aria-label={`${index + 1}`}>
        <Typography>{index + 1}</Typography>
        <div
          style={{ backgroundColor: rankColors[index] }}
          className={classes.colorRank}
        ></div>
      </ToggleButton>
    );
  });

  return (
    <div>
      <ToggleButtonGroup
        value={ranks}
        onChange={handleToggleRank}
        aria-label="text formatting"
      >
        {buttons}
      </ToggleButtonGroup>
    </div>
  );
};

RankFilter.propTypes = {
  ranks: PropTypes.array.isRequired,
  handleToggleRank: PropTypes.func.isRequired,
  rankColors: PropTypes.array.isRequired,
};

export default RankFilter;
