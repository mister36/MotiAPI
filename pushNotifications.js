const PushNotifications = require("node-pushnotifications");

class NotificationService {
  constructor() {
    this.config = {
      //   apn: {
      //     token: {
      //       key: process.env.APNS_P8.replace(/\\n/g, "\n"),
      //       keyId: process.env.APNS_KEY_ID,
      //       teamId: process.env.APNS_TEAM_ID,
      //     },
      //     production: false,
      //   },
      gcm: {
        id: process.env.FCM_API_KEY,
      },
      isAlwaysUseFCM: true,
    };
    this.push = new PushNotifications(this.config);
  }
  send(registrationIds, data) {
    return this.push.send(registrationIds, data);
  }
}
module.exports = NotificationService;
