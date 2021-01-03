const _ = require("lodash");
const axios = require("axios").default;
const { DateTime } = require("luxon");
const { motiConn } = require("../dbConnection");

const goalSchema = require("../models/goalModel");
const missionSchema = require("../models/missionModel");
const userSchema = require("../models/userModel");

const quotes = require("../static_files/quotes.json");
// const fs = require("fs");

const User = motiConn.model("User", userSchema);
const Goal = motiConn.model("Goal", goalSchema);
const Mission = motiConn.model("Mission", missionSchema);

// returns random item from array
const randArrayElem = (list = []) => {
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
      "my mission is to travel to the moon at 12:45am",
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
   * Sends response to Rasa
   */
  const response = (text) => {
    // checks if "text" string is an image
    if (text.includes("png") || text.includes("jpg")) {
      return resPayload.responses.push({ image: text });
    }
    resPayload.responses.push({ text });
  };

  switch (next_action) {
    // SECTION: New user

    case "action_new_user_mission":
      texts = [
        "Welcome to Motisesh! My name is Moti.",
        "We’ll start by making a mission",
        "Think of a mission as a super important goal that you’d like to accomplish. It shouldn’t be too easy, but it shouldn’t be too challenging",
      ];

      texts.forEach((val) => {
        response(val);
      });

      send(resPayload);
      break;

    case "action_new_user_goal":
      texts = [
        "A good way to keep track of your mission is by setting subgoals",
        "That way, you know you’re getting closer to achieving it",
      ];
      // TODO: Write function that adds all responses to resPayload(if needed)
      texts.forEach((val) => {
        response(val);
      });

      send(resPayload);
      break;

    // SECTION: New mission form
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

        // if user was new, set user.new to false in database
        if (slots.user_is_new) {
          await User.findByIdAndUpdate(slots.user_id, { new: false });
        }

        // console.log(mission);

        response(
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

    case "validate_new_goal_form":
      console.log("RUNNING VALIDATE");
      // If the "time" slot is null, yet somehow goal_end isn't,
      // remove the value in goal_end
      if (!slots.time && slots.goal_end) {
        event("slot", "goal_end", null);
      }
      send(resPayload);

      break;

    case "action_save_goal":
      // TODO: Save the goal into database (use "actual_time", not "time"!!!)

      response(`Do you feel that ${name}? You’re already one step closer.🔥`);
      send(resPayload);

      break;

    // SECTION: Time
    case "action_reset_time":
      // All the time related slots
      event("slot", "time", null);
      event("slot", "actual_time", null);
      event("slot", "mission_end", null);
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
        response("That’s awesome💯. What’s making you feel so good?");
      } else if (sentiment < -0.05) {
        response("Sorry to hear that. Why do you feel bad?");
      } else {
        response("What have you done recently?");
      }

      send(resPayload);
      break;

    case "action_save_mood":
      // TODO: Save mood in database
      sentiment = slots.sentiment_for_form;

      if (sentiment > 0.05) {
        response("That does sound nice. I’ll add that to your MotiMoods.");
      } else {
        event("followup", "action_improve_mood", undefined);
      }

      // Resets certain slots
      event("slot", "sentiment_for_form", null);
      event("slot", "improve_mood_with", null);
      event("slot", "mood_reason", null);

      send(resPayload);
      break;

    case "action_improve_mood":
      // TODO: Add more ways to improve mood
      // Sets the slot which tells how bot will try to cheer user up with
      event("slot", "improve_mood_with", "fruit");
      response(
        "Eating fruit is a quick way to improve your mood. Got any of these?"
      );
      response(
        "https://hos-kitchenwares.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/3/03030.00rd00001.jpg"
      );
      response(
        "https://www.boeschbodenspies.com/wp-content/uploads/2017/08/orange.png"
      );
      response(
        "https://toppng.com/uploads/preview/banana-1152834568854jqhpqhvq.png"
      );

      send(resPayload);
      break;

    // SECTION: Quote
    case "action_grab_quote":
      // picks random quote
      const randomQuoteObj = quotes[_.random(0, quotes.length)];
      resPayload.responses.push({
        text: `"${randomQuoteObj.text}" - ${randomQuoteObj.author}`,
      });

      // send payload
      send(resPayload);
      break;

    case "action_goal_created":
      const { goal, actual_time } = slots;
      console.log("ACTUAL TIME: ", actual_time);

      for (slot in slots) {
        // checks if slot is a goal_ and has a value
        if (
          ["goal_mission", "goal_habit", "goal_task"].includes(slot) &&
          slots[slot]
        ) {
          try {
            await Goal.create({
              type: slot.slice(5), // slices "goal_"
              dateEnd: actual_time,
              description: goal,
            });

            resPayload.responses.push({
              text: `Saved "${goal}" to your MotiGoals`,
            });
            send(resPayload, 201);
          } catch (error) {
            console.log(error);

            resPayload.responses.push({
              text: "Uh oh, something went wrong. Can you try again?",
            });
            send(resPayload, 400);
          }
          break;
        }
      }
      break;

    case "action_ask_create_goal_form_time":
      const taskText = [
        "What time should I remind you",
        "When should I remind you?",
      ];

      const missionText = [
        "That's great! What time will you do that by?",
        "Sounds like a plan. When do you want to accomplish that?",
      ];

      const habitText = ["How often should I remind you?"];

      // For loop used instead of if/else just in case more than one of these
      // slots are filled
      for (slot in slots) {
        // if goal_task exists
        if (slot === "goal_task" && slots.goal_task) {
          // picks random task response
          resPayload.responses.push({
            text: randArrayElem(taskText),
          });
          break;
        } else if (slot === "goal_mission" && slots.goal_mission) {
          resPayload.responses.push({
            text: randArrayElem(missionText),
          });
          break;
        } else if (slot === "goal_habit" && slots.goal_habit) {
          resPayload.responses.push({
            text: randArrayElem(habitText),
          });
          break;
        }
      }
      send(resPayload);

      break;

    case "action_get_time_from_text":
      // parses latest message for time,
      // along with reference time for relative terms (e.g, "tomorrow")
      //   console.log("latest message: ", latest_message_text);
      //   console.log("latest_time: ", latest_time);

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
    default:
      console.log("WRONG ACTION /////////////////////////");
      console.log(next_action);
  }
  //   next();
};
