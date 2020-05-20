const activities = require("./activities");
const users = require("./users");
const efforts = require("./segmentEfforts");
const details = require("./segmentDetails");
const utils = require("./utils");

const LIMIT_SIZE = 10;

const dataLayer = {
  addActivity,
  deleteActivities,
  popActivities,

  getEfforts,
  getEffortsWithPath,
  storeSegments,

  popDetails,
  addDetails,

  addUser,
  updateUser,
  getUser,
  deleteUser,
};

async function addActivity(id, altheteId) {
  await activities.add(id, altheteId);
}

async function popActivities(limit = LIMIT_SIZE) {
  return await activities.pop(limit);
}

async function deleteActivities(ids) {
  await activities.batchDelete(ids);
}

async function popDetails(Limit = LIMIT_SIZE) {
  return await details.pop(Limit);
}

async function addDetails(data) {
  await details.update(data);
}

async function getEfforts(altheteId, rank = 10) {
  if (rank === "error") {
    return await efforts.getErrors(altheteId);
  } else {
    return await efforts.get(altheteId, rank);
  }
}

//TODO promise.all this for performace
async function getEffortsWithPath(altheteId, rank = 10) {
  try {
    const results = await getEfforts(altheteId, rank);
    console.log("Getting PathGetting PathGetting PathGetting PathGetting PathGetting Path");
    console.time("getPath");
    // for (const effort of results) {
    //   const effortDetail = await details.get(effort.segmentId);
    //   if (effortDetail && effortDetail.line) effort.line = effortDetail.line;
    //   if (typeof effort.id === "bigint") effort.id = effort.id.toString();
    // }

    const promArray = results.map((effort) => details.get(effort.segmentId));
    const out = await Promise.all(promArray);

    out.forEach((effortDetail, i) => {
      if (effortDetail && effortDetail.line) results[i].line = effortDetail.line;
      if (typeof results[i].id === "bigint") results[i].id = results[i].id.toString();
    });

    console.timeEnd("getPath");
    return results;
  } catch (error) {
    console.log("Error:", error.message);
    console.log(error);
    return [];
  }
}

async function storeSegments(segments) {
  const rankedSegments = utils.parseRankedSegments(segments);
  const segmentDetails = utils.parseSegmentDetails(segments);
  await Promise.all([efforts.batchAdd(rankedSegments), details.batchAdd(segmentDetails)]);
}

async function addUser(data) {
  console.log("Data: Add USer");
  const id = data.id;
  const userExists = await users.exists(id);
  console.log("User Exists:", userExists);
  if (userExists) {
    throw new Error("User Already in DB");
  } else {
    console.log("Add user:", data);
    await users.update(data);
  }
}

async function updateUser(data) {
  const id = data.id;
  const userExists = await users.exists(id);
  if (!userExists) throw new Error("Update Error: User not in DB");
  else {
    await users.update(data);
  }
}

async function getUser(id) {
  const user = await users.get(id);
  return user;
}

async function deleteUser(altheteId) {
  //delete efforts
  const results = await efforts.get(altheteId, 10);
  const ids = results.map((result) => result.id);
  console.log(ids);
  efforts.batchDelete(ids);
  users.remove(altheteId);
}

module.exports = dataLayer;