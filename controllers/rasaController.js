const _ = require("lodash");
const ct = require("countries-and-timezones");
const axios = require("axios").default;
const { motiConn } = require("../dbConnection");
const goalSchema = require("../models/goalModel");
const quotes = require("../static_files/quotes.json");
const { reject } = require("lodash");
// const fs = require("fs");

const Goal = motiConn.model("Goal", goalSchema);

// returns random item from array
const randArrayElem = (list = []) => {
  return list[_.random(list.length - 1)];
};

// converting utc time to user time
// e.g 2020-12-23T06:30:00.000+00:00 -> 2020-12-23T06:30:00.000-06:00
// only +00:00 changes
// const UTCToUserTimeFormat = (utcTime, timezone = "America/Chicago") => {
//   const { utcOffsetStr } = ct.getTimezone(timezone);
//   const adjustedTime = utcTime.replace("+00:00", utcOffsetStr);

//   return adjustedTime;
// };

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

  // send payload function
  const send = (load, status = 200) => {
    res.status(status).json(load);
  };

  // response payload, what will be sent back
  let resPayload = { events: [], responses: [] };

  switch (next_action) {
    case "action_grab_quote":
      // picks random quote
      const randomQuoteObj = quotes[_.random(0, quotes.length)];
      resPayload.responses.push({
        text: `"${randomQuoteObj.text}" - ${randomQuoteObj.author}`,
      });

      // send payload
      send(resPayload);
      break;

    case "action_ask_record_motivation_form_actions_today":
      const { number } = slots;

      resPayload.events.push({
        event: "slot",
        name: "motivation_num",
        value: number,
      });
      resPayload.responses.push({
        text: "Gimme a summary of what you’ve done (or haven’t done) today",
      });

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
    case "validate_create_goal_form":
      for (slot in slots) {
        // checks if slot is a "goal_" and has a value
        if (
          ["goal_mission", "goal_habit", "goal_task"].includes(slot) &&
          slots[slot]
        ) {
          // sets value of whatever "goal_" is to "goal" slot
          resPayload.events.push({
            event: "slot",
            name: "goal",
            value: slots[slot],
          });
          break;
        }
      }

      send(resPayload);

      break;

    case "action_get_time_from_text":
      // parses latest message for time,
      // along with reference time for relative terms (e.g, "tomorrow")
      console.log("latest message: ", latest_message_text);
      console.log("latest_time: ", latest_time);
      //   console.log(
      //     `locale=en_US&text=${latest_message_text}&reftime=${latest_time *
      //       1000}&dims="[\"time\"]&tz=America/Chicago`
      //   );

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

          resPayload.events.push({
            event: "slot",
            name: "actual_time",
            value: firstExtractedTime,
          });
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
