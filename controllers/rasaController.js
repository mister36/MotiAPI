const _ = require("lodash");
const axios = require("axios").default;
const { DateTime } = require("luxon");
const { motiConn } = require("../dbConnection");

const goalSchema = require("../models/goalModel");
const missionSchema = require("../models/missionModel");
const userSchema = require("../models/userModel");
const moodSchema = require("../models/moodModel");

const quotes = require("../static_files/quotes.json");
// const fs = require("fs");

const User = motiConn.model("User", userSchema);
const Goal = motiConn.model("Goal", goalSchema);
const Mission = motiConn.model("Mission", missionSchema);
const Mood = motiConn.model("Mood", moodSchema);

/**
 *Returns random item from array
 */
const randArrayElem = (list = [""]) => {
  return list[_.random(list.length - 1)];
};

// NOTE: For production, full-icu must be installed for luxon's locales to work

exports.testTime = (req, res, next) => {
  res.status(200).json({
    status: "success",
    date: DateTime.fromISO(req.body.date).toLocaleString(DateTime.DATETIME_MED),
  });
};

exports.test = async (req, res, next) => {
  try {
    const response = await parseTime(
      "/info" +
        JSON.stringify({
          mission: "go to the moon forever",
          time: "January 25",
        }),
      1608790764096.599 * 1000,
      "America/Chicago"
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const parseTime = async (text, reftime, tz) => {
  try {
    const response = await axios({
      url: "http://192.168.1.72:8000/parse",
      method: "POST",
      data: `locale=en_US&text=${text}&reftime=${Math.ceil(
        reftime
      )}&dims="[\"time\"]&tz=${tz}`,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

exports.action = async (req, res, next) => {
  const request = req.body;
  const next_action = request.next_action;
  const events = request.tracker.events;
  const latest_message_text = request.tracker.latest_message.text;
  const latest_time = request.tracker.latest_event_time;
  const entities = request.tracker.latest_message.entities;
  const slots = request.tracker.slots;
  const sender = request.sender_id;
  const responses = request.domain.responses;
  const active_form = request.tracker.active_form;
  const name = slots.user_name;
  const email = slots.user_email;

  let texts;
  let sentiment;

  // response payload, what will be sent back
  let resPayload = { events: [], responses: [] };

  // send payload function
  const send = (load, status = 200) => {
    res.status(status).json(load);
  };

  /**
   * Sends event to Rasa
   */
  const event = (event, name, value) => {
    // if no value (not including null)
    if (value === undefined) {
      return resPayload.events.push({ event, name });
    }
    resPayload.events.push({ event, name, value });
  };

  /**
   * Sends text to Rasa
   */
  const text = (text) => {
    if (Array.isArray(text)) {
      text.forEach((val) => {
        resPayload.responses.push({ text: val });
      });
    } else {
      resPayload.responses.push({ text });
    }
  };

  /**
   * Sends image to Rasa
   */
  const image = (url) => {
    if (Array.isArray(url)) {
      url.forEach((val) => {
        resPayload.responses.push({ image: val });
      });
    } else {
      resPayload.responses.push({ image: url });
    }
  };

  /**
   * Sends custom info to Rasa
   */
  const custom = (obj) => {
    resPayload.responses.push({ custom: obj });
  };

  switch (next_action) {
    // SECTION: New user

    // case "action_new_user_mission":
    //   texts = [
    //     "Welcome to Motisesh! My name is Moti.",
    //     "We’ll start by making a mission",
    //     "Think of a mission as a super important goal that you’d like to accomplish. It shouldn’t be too easy, but it shouldn’t be too challenging",
    //   ];

    //   texts.forEach((val) => {
    //     text(val);
    //   });

    //   send(resPayload);
    //   break;

    case "action_new_user_goal":
      texts = [
        "Welcome to Motisesh! My name is Moti.",
        "I’d like to know more about you",
        // "So Adam, what’s one goal you want to accomplish?",
      ];

      text(texts);

      send(resPayload);
      break;

    // SECTION: New mission form
    case "action_ask_new_mission_form_mission":
      text(`So ${slots.user_name}, tell me what your mission is!`);
      custom({ component: "mission_form" });
      send(resPayload);

      break;

    case "action_save_mission":
      // TODO: Set "user.isNew" to false in database

      const description = slots.mission;

      try {
        // Save mission to database
        const mission = await Mission.create({
          description,
          dateEnd: slots.actual_time,
          userId: slots.user_id,
        });

        // console.log(mission);

        text(
          `Perfect. Just saved your mission "${
            slots.mission
          }" for ${DateTime.fromISO(slots.actual_time).toLocaleString(
            DateTime.DATETIME_MED
          )}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        send(resPayload);
      }

      break;

    // SECTION: New goal form

    // case "validate_new_goal_form":
    //   // if user is new, set goal type to task
    //   // (Just to make things easier)
    //   if (slots.user_is_new && !slots.goal) {
    //     event("slot", "goal_type", "task");
    //   }
    //   // If the "time" slot is null, yet somehow goal_end has a value,
    //   // remove the value in goal_end
    //   // Solves problem which occurred in new user flow
    //   if (!slots.time && slots.goal_end) {
    //     event("slot", "goal_end", null);
    //   }

    //   // if the extracted goal type text includes every,
    //   // set "goal_type" to habit, otherwise task
    //   //  TODO: Will fix this for more flexibility
    //   if (slots.goal_type) {
    //     if (
    //       (slots.goal_type.includes("every") && !slots.goal_end) ||
    //       slots.goal_type.includes("habit")
    //     ) {
    //       event("slot", "goal_type", "habit");
    //     } else {
    //       event("slot", "goal_type", "task");
    //     }
    //   }

    //   send(resPayload);

    //   break;

    case "action_ask_new_goal_form_goal":
      if (slots.user_is_new) {
        // TODO: Have this response for creating a new mission as well
        text("So Adam, what’s one goal you want to accomplish?");
      } else {
        text("I like your thinking. What goal would you like to add?");
      }

      // sends goal form component
      custom({ component: "goal_form" });
      send(resPayload);
      break;

    case "action_save_goal":
      const timeRepeat = DateTime.fromISO(slots.actual_time).toLocaleString(
        DateTime.TIME_24_SIMPLE
      );
      try {
        // creates goal
        await Goal.create({
          description: slots.goal,
          dateEnd: slots.goal_type === "habit" ? null : slots.actual_time,
          type: slots.goal_type,
          userId: slots.user_id,
        });

        // if user was new, set user.new to false in database and update slot
        if (slots.user_is_new) {
          await User.findByIdAndUpdate(slots.user_id, { new: false });
          event("slot", "user_is_new", false);
          text(`Awesome. This is just the beginning ${slots.user_name}!`);
        } else {
          text("Goal created. Check out the home page to see it!");
        }

        event("slot", "goal", null);
        event("slot", "goal_end", null);
        event("slot", "goal_type", null);
      } catch (error) {
        console.log(error);
      } finally {
        send(resPayload);
      }

      break;

    // SECTION: Time
    case "action_reset_time":
      // All the time related slots
      event("slot", "time", null);
      event("slot", "word_time", null);
      event("slot", "actual_time", null);
      event("slot", "goal_end", null);

      send(resPayload);

      break;

    // SECTION: MOOD
    case "validate_record_mood_form":
      // Sets "sentiment_for_form" to "sentiment"
      // if sentiment available
      if (slots.sentiment && !slots.sentiment_for_form) {
        event("slot", "sentiment_for_form", slots.sentiment);
      }

      send(resPayload);
      break;

    case "action_ask_record_mood_form_mood_reason":
      sentiment = slots.sentiment;

      if (sentiment > 0.05) {
        text("That’s awesome💯. What’s making you feel so good?");
      } else if (sentiment < -0.05) {
        text("Sorry to hear that. Why do you feel bad?");
      } else {
        text("What have you done recently?");
      }

      send(resPayload);
      break;

    case "action_save_mood":
      const posTexts = [
        "That does sound nice. I’ll add that to your MotiMoods.",
        `Good for you, ${slots.user_name}!`,
        "When you feel good, I feel good😃",
      ];

      const negTexts = [
        `Sorry you're not feeling so well ${slots.user_name}`,
        "Wow that's not good🤔",
      ];

      const neuTexts = [
        "In the meantime, check out any goals you have left, or make a new one",
      ];
      sentiment = slots.sentiment_for_form;

      try {
        await Mood.create({
          description: slots.mood_reason,
          sentiment,
          userId: slots.user_id,
        });
      } catch (error) {
        console.log(error);
        return send(resPayload);
      }

      if (sentiment > 0.05) {
        text(randArrayElem(posTexts));
      } else if (sentiment < 0.05) {
        text(randArrayElem(negTexts));
        event("followup", "improve_mood_form", undefined);
      } else {
        text(randArrayElem(neuTexts));
      }

      // Resets certain slots
      event("slot", "sentiment_for_form", null);
      event("slot", "mood_reason", null);

      send(resPayload);
      break;

    // case "action_improve_mood":
    //   // TODO: Add more ways to improve mood
    //   // Sets the slot which tells how bot will try to cheer user up with
    //   event("slot", "improve_mood_with", "fruit");
    //   text(
    //     "Eating fruit is a quick way to improve your mood. Got any of these?"
    //   );
    //   image(
    //     "https://hos-kitchenwares.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/3/03030.00rd00001.jpg"
    //   );
    //   image(
    //     "https://www.boeschbodenspies.com/wp-content/uploads/2017/08/orange.png"
    //   );
    //   image(
    //     "https://toppng.com/uploads/preview/banana-1152834568854jqhpqhvq.png"
    //   );

    //   send(resPayload);
    //   break;

    // SECTION: Quote
    case "action_grab_quote":
      // picks random quote
      const randomQuoteObj = randArrayElem(quotes);
      resPayload.responses.push({
        text: `"${randomQuoteObj.text}" - ${randomQuoteObj.author}`,
      });

      // send payload
      send(resPayload);
      break;

    case "action_get_time_from_text":
      // parses latest message for time,
      // along with reference time for relative terms (e.g, "tomorrow")

      try {
        const timeResponse = await parseTime(
          latest_message_text,
          latest_time * 1000,
          "America/Chicago"
        );

        // only if there were any extracted times
        if (timeResponse.length > 0) {
          // perhaps in the future, store all extracted times
          // in an array and set "actual_time" slot with that
          const firstExtractedTime = timeResponse[0].value.value;

          event("slot", "actual_time", firstExtractedTime);
        }
        send(resPayload);
      } catch (error) {
        console.log(error);
        send(resPayload, 400);
      }

      break;

    case "action_get_time_from_words":
      try {
        const timeResponse = await parseTime(
          slots.word_time,
          latest_time * 1000,
          "America/Chicago"
        );

        // only if there were any extracted times
        if (timeResponse.length > 0) {
          // perhaps in the future, store all extracted times
          // in an array and set "actual_time" slot with that
          const firstExtractedTime = timeResponse[0].value.value;

          event("slot", "actual_time", firstExtractedTime);
        }
        send(resPayload);
      } catch (error) {
        console.log(error);
        send(resPayload, 400);
      }
      break;
    default:
      console.log("WRONG ACTION /////////////////////////");
      console.log(next_action);
  }
  //   next();
};
