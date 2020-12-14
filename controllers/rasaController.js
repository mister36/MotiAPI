const { handleFormAction } = require("nodejs-formaction-sdk-rasa");
const _ = require("lodash");
const quotes = require("../static_files/quotes.json");

exports.action = (req, res, next) => {
  const request = req.body;
  const next_action = request.next_action;
  const entities = request.tracker.latest_message.entities;
  const slots = request.tracker.slots;
  const sender = request.sender_id;

  // response payload, what will be sent back
  let resPayload = { events: [], responses: [] };

  switch (next_action) {
    case "action_grab_quote":
      nextAction = "action_listen";

      // picks random quote
      const randomQuoteObj = quotes[_.random(0, quotes.length)];
      resPayload.responses.push({
        text: `"${randomQuoteObj.text}" - ${randomQuoteObj.author}`,
      });

      // send payload
      res.status(200).json(resPayload);
      break;
    default:
      console.log("Wrong action");
  }
};

// exports.action = (req, res, next) => {
//   const request = req.body;
//   const next_action = request.next_action;
//   const entities = request.tracker.latest_message.entities;
//   const slots = request.tracker.slots;
//   const sender = request.sender_id;
//   // These are all the slots
//   //   const required_slots = [
//   //     "toppings",
//   //     "radius",
//   //     "boxes",
//   //     "enemy_name",
//   //     "phone_number",
//   //   ];

//   let formAction;
//   let nextAction;

//   // Get rid of this later
//   //   console.log(request);

//   switch (next_action) {
//     case "action_say_form_finished":
//       nextAction = "action_listen";
//       formAction = handleFormAction(
//         ["toppings", "radius", "boxes"],
//         entities,
//         slots,
//         nextAction,
//         sender
//       );

//       formAction
//         .then((results) => {
//           console.log("got results");
//           console.log(results);
//           return res.status(200).json(results);
//         })
//         .catch((err) => console.log(err));
//       break;

//     default:
//       console.log("No action");
//   }
// };
