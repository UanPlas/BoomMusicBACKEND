const { IncomingWebhook } = require("@slack/webhook")


const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);


const loggerStream = {
  write: message => {
    console.log("Capturando el LOG", message);
    webHook.send({//En este punto se puede conectar a un canal de telegram, emial, o otro sistemas
      text: message
    })
  } 
};

module.exports = loggerStream;