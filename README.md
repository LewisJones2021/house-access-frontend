# House Access Manager

# Description 
Inspired by accessing multiple lockbox codes, I wanted to create something where the user is able to add a house to the database via a form and be able a to enter the name of the property, which will display the access code along with notes about the property etc.

# Techincal information 
'House Access Manager' is my first full-stack project using HTML, CSS, JavaScript and MongoDB for the database.
The server is built using "Mongoose" and it stores the back-end code written in JavaScript, which has the API endpoints 
for the front-end to connect to when making a request. For example, when the user adds a new house to the data base, the API endpoint will 
make a post request and update/serve it to the server. 

#This project has now been refactored into GoLang code for the back-end

# View this project locally
To see this project locally, you must have Mongoose installed. Clone the URL using: git clone 'https://github.com/LewisJones2021/house-access-manager.git'.
Once it is cloned, CD into the scripts folder and type "mongosh" and "node server.js". This will allow you to view the project locally on 'localhost:3000'.
If you type 'http://localhost:3000/api/houses' for example, this will take you to the API endpoint with the data.

# This project isn't finished.
