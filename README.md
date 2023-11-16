
# House Access Manager

# Description
House Access Manager is a project born out of the need to manage multiple lockbox codes for various properties. The application allows users to add houses to a database through a form. Users can input the property name, and the system will display the corresponding access code along with additional notes about the property.

# Technical Information
This project represents my inaugural foray into full-stack development, utilizing HTML, CSS, JavaScript, and MongoDB for the database. The server is constructed using "Mongoose," housing the back-end code written in JavaScript. The server provides API endpoints that the front-end connects to when making requests. For instance, adding a new house triggers a post request to the API endpoint, updating and serving the information to the server.

# Note: The project has undergone refactoring, transitioning the back-end code into GoLang.

# View This Project Locally
To view this project locally, ensure you have Mongoose installed. Clone the repository using the following command:

```
git clone https://github.com/LewisJones2021/house-access-manager.git
```
Once cloned, navigate to the 'scripts' folder and execute the following commands:

```
bash
Copy code
mongosh
node server.js
```
This will enable you to access the project locally at 'localhost:3000'. For example, entering 'http://localhost:3000/api/houses' in your browser will direct you to the API endpoint containing the data.

# Please note that this project is still a work in progress.





