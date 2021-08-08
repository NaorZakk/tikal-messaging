# tikal-messaging

## How to run the server:
- install docker
- docker-compose up

## How to make requests:
### GET messages 
http://localhost:3005/messages/{recipient_name}

### POST a message
http://localhost:3005/messages

Body:
```code
{
    "sender": "{sender_name}",
    "recipient": "{recipient_name}",
    "message": "{message}"
}
```

In order to run tests, you'll need to run 'npm install' and then run 'npm test'
