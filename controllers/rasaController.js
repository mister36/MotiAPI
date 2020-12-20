const { handleFormAction } = require("nodejs-formaction-sdk-rasa");
const _ = require("lodash");
const quotes = require("../static_files/quotes.json");
const fs = require("fs");

exports.action = (req, res, next) => {
  const request = req.body;
  const next_action = request.next_action;
  const events = request.tracker.events;
  const entities = request.tracker.latest_message.entities;
  const slots = request.tracker.slots;
  const sender = request.sender_id;
  const responses = request.domain.responses;
  const active_form = request.tracker.active_form;

  // send payload function
  const send = (load) => {
    res.status(200).json(load);
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
    default:
      console.log("WRONG ACTION /////////////////////////");
      console.log(next_action);
  }
};
