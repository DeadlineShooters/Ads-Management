# Ads Management
This project aims to create a web application for managing billboard placements in a city. The system includes interfaces for citizens, district officials, and city officials, enabling features such as interactive map displays, detailed information on advertising boards, citizen reporting, and approval processes. The project employs technologies like Ajax, JavaScript, and jQuery for front-end development, while utilizing frameworks like ExpressJS for server-side rendering and various map APIs for geospatial functionalities

## Local Quickstart

Follow these steps to get the app running locally.

### 1. Clone the repo

```
git clone https://github.com/DeadlineShooters/Ads-Management.git
```

### 2. Install dependencies

Open a terminal in the root directory of your local Ads Management repository and run:

```
npm install
```

### 3. Create .env file in the root directory

Paste those to .env file:

```
DAN_PORT=3000
CANBO_PORT=9000
MONGO_URI=your_mongo_uri_placeholder
GOOGLE_MAP_KEY=your_google_map_key_placeholder
MAP_ID=your_map_id_placeholder
MAILER_PASS=your_mailer_password_placeholder
MAILER_SERVICE=your_mailer_service_placeholder
MAILER_USER=your_mailer_user_placeholder
CAPTCHA_SITE_KEY=your_captcha_site_key_placeholder
CAPTCHA_SECRET_KEY=your_captcha_secret_key_placeholder
```

Replace placeholder texts.

### 4. Run app locally

- Run citizen subsystem:

```
npm run dan
```

- Run officials subsystem:

```
npm run canbo
```
