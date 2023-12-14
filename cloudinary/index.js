import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: "dk6q93ryt",
    api_key: "269765299134423",
    api_secret: "AE16-3bC69LhP0ll7K9rmGUvGRs"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // folder: "AdsManagement", // Optional: Set a folder name in Cloudinary
    // allowedFormats: ["jpg", "png", "jpeg"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
    params: {
        folder: 'AdsManagement',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

export { cloudinary, storage };