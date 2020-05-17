import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";

import {
  makeStyles,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Tooltip,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

const useRowStyles = makeStyles((theme) => ({
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
    "& > *": {
      // margin: 15,
    },
  },
  itemNumber: {
    minWidth: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  listItem: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .12)",
    },
  },
  secondaryText: {
    display: "flex",
    justifyContent: "space-between",
  },
  selectedStyle: {
    backgroundColor: "rgba(0, 0, 0, .13)",
  },
  stravaIcon: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.strava,
  },
  stravaBtn: {
    backgroundColor: theme.palette.strava,
    color: "white",
    maxHeight: 40,
  },
}));

function Row(props) {
  const classes = useRowStyles();

  let { activity, index, selectedAct, handleSelectedAct, handleRemoveActivity } = props;
  
  const avatarStyles = {
    root: classes.itemNumber,
  };
  const isEffort = activity.segmentId !== undefined;


  let infoA,infoB,infoC,stravaLink;
if(isEffort){
  const date = moment(activity.date)


  infoA = `Rank: ${activity.rank}`
  infoB = ""
  infoC = `Date: ${date.format('MMM DD YY')}`
  stravaLink = `http://www.strava.com/segments/${activity.segmentId}`
}else{
  const distance = (activity.distance / 1609).toFixed(2);
  const date = moment.unix(activity.date);
  
  const totalHours = activity.elapsedTime / 3600;
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);

  infoA = `${distance}mi`
  infoB = `${date.format("MMM DD")}`
  infoC = `${hours}:${minutes} hrs`
  stravaLink = `http://www.strava.com/activities/${activity.id}`
}


  return (
    <div
      id={`row${activity.id}`}
      className={clsx({
        [classes.listItem]: true,
        [classes.selectedStyle]: activity.id === selectedAct.id,
      })}
    >
      <ListItem
        key={index}
        onClick={() => {
          handleSelectedAct(activity, "row");
        }}
      >
        <ListItemAvatar classes={avatarStyles}>
          <div>{index + 1}</div>
        </ListItemAvatar>
        <ListItemText
          primary={activity.name}
          secondary={
            <span className={classes.secondaryText}>
              <span>{infoA}</span>
              <span>{infoB}</span>
              <span>{infoC}</span>
            </span>
          }
        />
      </ListItem>
      {selectedAct.id === activity.id && (
        <div className={classes.actions}>
          <Tooltip title="Remove from map" placement={"top"}>
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleRemoveActivity(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View on Strava" placement={"top"}>
            <IconButton>
              <a
                href={stravaLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img className={classes.stravaIcon} src={"client/img/strava-icon.svg"} />
              </a>
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired,
  selectedAct: PropTypes.shape({
    id: PropTypes.number,
  }),
  handleSelectedAct: PropTypes.func.isRequired,
  handleRemoveActivity: PropTypes.func.isRequired,
};

export default Row;
