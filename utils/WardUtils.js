import District from "../models/district.js";
import Ward from "../models/ward.js";

export async function getWardsForUser(user) {
  let wards = [];

  if (user.role === "quan") {
    // get all the wards for district of user (user.district)
    const foundDistrict = await District.findOne({ name: user.district });

    if (foundDistrict) {
      wards = await Ward.find({ district: foundDistrict._id });
    }
  }

  return wards;
}
