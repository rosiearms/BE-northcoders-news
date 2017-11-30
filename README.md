# BE-northcoders-news

This API has been built using Node.js, Express.js, MongoDB and Mongoose.

This repo contains all of the back-end code for the Northcoders News project - a reddit like blog site. The code for the front-end can be viewed and run here: https://github.com/rosiearms/northcoders-news

Before running the front end you need to make sure the database is seeded and you are connected. Please follow the instructions below.

# System Setup

- Make sure you have node installed.

```node -v``` 

This will tell you which version you are currently running. If you do not have it installed already please refer to the documentation found here: https://nodejs.org/en/download/ 

- Make sure you have npm installed.

```npm -v```

If you have it installed, this will tell you the version. If you don't, run the following in your terminal window:

```npm install npm```

- Install MongoDB if you do not already have it. Installation instructions can be found here: https://docs.mongodb.com/manual/installation/

# Project Setup

- To clone the project and install dependencies, open a terminal window and navigate to a folder where you wish to save the project. Run the following command:

```git clone https://github.com/rosiearms/BE-northcoders-news```

- To install all project dependencies, navigate into the new folder and run:

```npm install```

- Open a terminal, navigate to the project folder and run:

```mongod```

- Open another terminal, navigate to the project folder and run:

```npm start```

- Open another terminal, navigate to the project folder and seed the database with the main seed file by running:

```node seed/seed.js```

You should receive a message saying you have successfully connected to the database!

Once you have connected you can run the front-end project and view the website.

# Tests

- To view the tests run:

```npm test```

