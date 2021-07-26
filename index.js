const express = require('express');
const bodyParser = require('body-parser');

const handleEvent = require('./event-handler');

const MESSAGE_CREATED_EVENT_TYPE = 'messageCreated';

const app = express();
app.use(bodyParser.json());


const messagesForRecipients = {};

app.get('/messages/:recipient', (req, res) => {
  try {
    let { recipient } = req.params;

    recipient = recipient.toLowerCase();

    let messagesForRecipient = []

    if (messagesForRecipients[recipient]) {
      messagesForRecipient = messagesForRecipients[recipient]
    }

    res.status(200).send({ status: 'success', payload: messagesForRecipient });

  } catch (err) {
    console.log(err);

    return res.status(400).send({ status: 'error', message: 'Something went wrong' });
  }
});

app.post('/messages', (req, res) => {
  try {

    let { sender, recipient, message } = req.body;

    sender = sender.toLowerCase();
    recipient = recipient.toLowerCase();

    if (!messagesForRecipients[recipient]) {
      messagesForRecipients[recipient] = []
    }

    const newMessage = { sender, recipient, message };

    messagesForRecipients[recipient].push(newMessage);

    handleEvent(MESSAGE_CREATED_EVENT_TYPE, newMessage);

    res.status(201).send({ status: 'success', payload: newMessage });

  } catch (err) {
    console.log(err);

    res.status(400).send({ status: 'error', message: 'Something went wrong' });
  }
});


const PORT = 3005;

app.listen(PORT, () => console.log(`Listening on ${PORT} `));


module.exports = app;
