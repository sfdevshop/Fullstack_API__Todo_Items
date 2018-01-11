xD
With this app, you can register an account, log in, edit your profile, update your passward, create notes, edit notes and delete notes.

1. Open pgAdmin4 and create the local database named notedb. Assign the database to u (User name).
2. Create a user named u and allow this user to have all the priviliges. Set password=123456.
3. Under your Appointment-Scheduling-Web app file, run npm install -g sequelize-cli sequlize db:migrate (If you already installed sequelize, you can skip the installation)
4. Run npm start
Now, you can test it locally on postman with the address: 127.0.0.1:8000/api/users

To have a front end:
1. Under your Appointment-Scheduling-Web app file, run npm install.
2. Go to frontend file and run npm install.
3. Go to your Appointment-Scheduling-Web app file and run npm start. (This will open the browser window for u)
4. Go to your frontend file and run npm start.
Finished. The app should run on localhost:3000.







