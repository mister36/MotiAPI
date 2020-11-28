const PushNotifications = require("node-pushnotifications");
const jwt = require("jsonwebtoken");

// const token = jwt.sign({});

class NotificationService {
  constructor() {
    this.config = {
      apn: {
        token: {
          // key: process.env.APNS_P8.replace(/\\n/g, "\n"),
          key: `${__dirname}/${process.env.APN_KEY_FILE_NAME}`,
          keyId: process.env.APN_KEY_ID,
          teamId: process.env.APN_TEAM_ID,
        },
        production: process.env.NODE_ENV === "production" ? true : false,
      },
      gcm: {
        id: process.env.FCM_API_KEY,
      },
      // isAlwaysUseFCM: true,
    };
    this.push = new PushNotifications(this.config);
  }
  send(registrationIds, data) {
    return this.push.send(registrationIds, data);
  }
}
module.exports = NotificationService;
