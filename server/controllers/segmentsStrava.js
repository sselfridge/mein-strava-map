const summaryStrava = require("./summaryStrava");
const db = require("../db/dataLayer");
const config = require("../../config/keys");
const utils = require("../utils/stravaUtils");

const segmentController = {
  test,
  segmentEfforts,
  initializeUser,
  updateUserDB,
  getUser,
};

async function updateUserDB(req, res, next) {
  console.log("updating user in DB");
  const userData = getUserData(res);
  try {
    await db.updateUser(userData);
  } catch (err) {
    res.locals.err = err;
    return next();
  }
  return next();
}

async function initializeUser(req, res, next) {
  console.log("initialize User");
  try {
    const strava = res.locals.strava;
    const userData = getUserData(res);
    await db.addUser(userData);

    //kick_off get activities
    addToActivityQueue(strava);
    const count = await totalUserActivites(strava, res.locals.user.athleteId);
    res.locals.data = { activityCount: count };
    return next();
  } catch (err) {
    console.log("Initalize Error:");
    console.log(err);
    res.locals.err = err;
    return next();
  }
}

function getUserData(res) {
  const user = res.locals.user;
  const accessToken = res.locals.accessToken;
  const refreshToken = res.locals.refreshToken;
  const userData = {
    id: user.athleteId,
    accessToken,
    refreshToken,
  };
  return userData;
}

async function getUser(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    const user = await db.getUser(id);
    res.locals.user = user;
    next();
  } catch (error) {
    res.locals.err = "Error Fetching User";
    console.error(error);
    next();
  }
}

async function checkInitStatus(req, res, next) {
  //get user stats
  //get # of user actvities in Queue
}

async function checkSegmentSyncStatus(req, res, next) {}

async function segmentEfforts(req, res, next) {
  const athleteId = res.locals.user.athleteId;
  const rank = parseInt(req.query.rank ? req.query.rank : 1);
  const efforts = await db.getEffortsWithPath(athleteId, rank);
  res.locals.segmentEfforts = efforts;
  next();
}

async function totalUserActivites(strava, id) {
  const result = await strava.athletes.stats({ id });
  const count = result.all_ride_totals.count + result.all_run_totals.count;
  return count;
}

async function addToActivityQueue(strava) {
  try {
    const result = await summaryStrava.fetchActivitiesFromStrava(strava, 0, 2550000000);
    //March + April Rides
    // const result = await summaryStrava.fetchActivitiesFromStrava(strava, 1585724400, 1588220022);
    //2020 Rides
    // const result = await summaryStrava.fetchActivitiesFromStrava(strava, 1577865600, 1588539708);
    // 1 result
    // const result = await summaryStrava.fetchActivitiesFromStrava(strava, 1588057200, 1588220022);
    result.forEach((activity) => {
      if (!activity.map.summary_polyline) return; //skip activites with no line
      db.addActivity(activity.id, activity.athlete.id);
    });
    console.log("Done Adding to DB");
  } catch (error) {
    console.error("Error while Adding to activtity table:", error.message);
    //Do nothing for now, add event emitter here if this starts to become a problem
  }
}

async function test(req, res, next) {
  console.log("Start Test");
  const strava = res.locals.strava;

  try {
    const result = await strava.segments.listLeaderboard({ id: 8058447 });
    // const result = await strava.segments.get({ id: 9675572 });
    console.log(result);
    console.log("Done with DB");
  } catch (err) {
    console.log("CRAP!!!");
    console.log(err.message);
    res.locals.err = "AAAAAAAAA";
  }

  console.log("Test Done");
  next();
}

module.exports = segmentController;