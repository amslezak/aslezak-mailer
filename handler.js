"use strict";
require("dotenv").config();

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

module.exports.hello = (event, context, callback) => {
  let msg = JSON.parse(event.body);

  let data = {
    from: `${msg.from} <${msg.email}>`,
    to: "andyslezak@gmail.com",
    subject: "Hello from aslezak.com",
    text: msg.text
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify("OK")
  };

  callback(null, response);
};
