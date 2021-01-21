# University of Minnesota Coding Boot Camp - Fall 2020 
## Group Project #2: Team P.H.A.T.E.: 
### (Peter Phenow, Heather Lamkins, Adrian Pinow, Troy Dorman, Esmond Kim)
## "Hidden Gems" - Google Maps & Sequelize Demonstration
<br/>

![example gif](/example/example.gif)


### Overview

The focus of this assignment was to work with a group of fellow students to create a fully-functional website utilizing all of the material we have learned so far in class.  

Our project, **Hidden Gems**, is a Google Maps API-powered application, utilizing a MYSQL database in conjunction with Sequelize, that lets the user store locations on a map of places they loved visiting before the pandemic lockdowns, as reminders to visit them again, or to share their experience with other users encouraging them to visit.  When the user clicks anywhere on the map, a pop up window appears and lets them enter information about the location.  After submitting their location, the marker's data and location is written into the database for future use and for others to see.


**These were the project's posted minimum requrements**:

- [x] Must use a Node and Express server
- [x] Must use Handlebars.js as the template engine
- [x] Must be backed by a MySQL database with a Sequelize ORM
- [x] Must utilize both GET and POST routes for retrieving and adding new data
- [x] Must be deployed using Heroku (with data)
- [x] Must utilize at least one new library, package, or technology that we haven’t discussed
- [x] Must have a polished front end/UI
- [x] Must have a folder structure that meets the MVC paradigm
- [x] Must meet good quality coding standards (indentation, scoping, naming)
- [x] ** Must protect API keys in Node with environment variables

** *With approval of our class instructor Charlie, we are unable to hide our API keys due to limitations in the interaction with Google Maps.  When we include our Google Maps module via an HTML script block, we are required to give our API key, but there is no way to hide that information with an environment variable.*


### Review of Tasks

While reviewing and demonstrating our learned knowledge thus far is a priority of our three group projects throughout the duration of the boot camp, a special emphasis must always be considered on the collaborative effort working together to accomplish this task.  Delegating duties and working through merge conflicts is always a huge learning experience, along with strategizing a complex project with multiple people, and we're proud to say we accomplished a lot.  Our team held our spirits high as we forged our path through this project, and we learned a lot about the intricacies of the collaborative experience, and we hope you enjoy our final product.

#### Here are the steps taken to achieve this complete this group project:

* With project requirements kept in mind, the team brainstormed and plotted the application's functionality, brand strategy, and development cycle.
* Built initial file system structure and deployed basic blueprint to Github to complete repository construction.
* Set up Heroku application along with JawsDB database integration. 
* Sketched out pseudo code logic and transcribed them into the code as comments.
* Utlized supplied "Passport Example" login/password codebase to build off, and integrated it into site.
* Delegated duties amongst team members through the project kaban on Github.
* Integrated Travis CI code verification with the help of T.A. Daniel.
* Built general user interface with 75% of the viewing surface our interactive Google Map, 25% for information and interact.
* Built pop up box when a user clicks the map and generates a new marker.
* Created "Markers" model for Sequelize.
* Built Sequelize functionality to write new markers to the database as well as update markers.
* Front end team cleaned up the UI for the login and sign up pages.
* Geo-locating the user's location upon map loading.
* Integrated custom picture upload system utilizing **multer**, but ultimately pulled from the final version due to lack of write capabilities to the default Heroku file system.
* Integrated Handlebars.js into our **M**odels-**V**iew-**C**ontroller paradigm. 
* Integrated colorful gem icons to use as custom map markers.
* Integrated "Login with Facebook" authentication functionality to login screen using **OAuth 1.0a** API.
* 
* to be continued...
* 



*After multiple trial and error debugging sessions, all applied logic appears sound and no bugs can be generated from purposeful negligent entries.  From this point, it was time to clean up:*

* Refactor reduntant and worthless code.
* Removed multiple, annoying console.log commands used for debugging.
* Double-checked to ensured code was properly formatted and commented before submission.
* Used code validation service Travis CI in conjunction with ESLint.
* Wrote README.MD file.
* Added screenshots and example GIF to README.
 

### Installation

Installation should be fairly straightforward, but here's a quick guide to get up and running, assuming you have **Visual Studio Code** and **Git** (with the accompanying interface **Git Bash**) installed.

* from your shell input the command: `git clone https://github.com/hlamkins/Project2.git`
* once downloaded, from the working directory in the shell, input the command: `npm install` to load all of the modules
* ensure you have a functional MYSQL database running at http://localhost:3306
* create a database entitled "passport_db"
* edit the configure.json file to hold your MYSQL localhost database credentials
* input 'node server' at the command line in the project's working directory.
* enjoy!

### Live Example

This project is deployed on the world wide intertubes via **Heroku** at:

https://ancient-waters-90063.herokuapp.com/


# Screenshots of Deployed Website

![screenshot 992px width](/img/ss1.PNG)
![screenshot 992px width](/img/ss2.PNG)
![screenshot 992px width](/img/ss3.PNG)
![screenshot 768px width](/img/ss4.PNG)
![screenshot 768px width](/img/ss5.PNG)

### License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Copyright 2020 Team P.H.A.T.E., distrubuted under the **GNU Public License** for the Univeristy of Minnesota Part-Time Full Stack Coding Boot Camp.














