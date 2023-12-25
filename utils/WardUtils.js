import District from "../models/district.js";
import Ward from "../models/ward.js";

export async function getWardsForUser(user) {
  let wards = [];

  if (user.role === "quan") {
    // get all the wards for district of user (user.district)

    wards = await Ward.find({ district: user.district._id });
  }

  return wards;
}
