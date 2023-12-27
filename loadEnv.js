import dotenv from "dotenv";

if (process.env.GOOGLE_APP_PASS !== "production") {
  dotenv.config();
}
