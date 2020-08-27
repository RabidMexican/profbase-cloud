# ProfBase Cloud

This script should run on a the ProfBase firebase cloud server and automatically send notifications to the users subscribed to modified course schedules.


## Requirements

* NodeJS
* Firebase

## Testing 

```bash
    npm install -g firebase-tools

    cd C:\my\project\folder

    firebase emulators:start
```

* You can now access the emulated database at http://localhost:4000/database

* Copy our database into your virtual instance of firebase

*   `npm start`

* Change a value in the virtual database and the script should do something

## References 

https://firebase.google.com/docs/functions/get-started
