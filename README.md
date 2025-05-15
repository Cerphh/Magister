<div align="center">
     <img src="https://github.com/user-attachments/assets/c7a2d933-97aa-4f69-b8a4-871f67724b67" alt="Logo" width="400" height="260">

 <h3 align="center">
    The Apprentice of Quality Education
  </h3>
  <p align="center">
    <b>Team 5</b> <br>
    <a href="https://github.com/Cerphh">Cruz, Paul Oliver E.</a> <br>
    <a href="https://github.com/oocim">Cuarto, Mico Raphael F.</a> <br>
    <a href="https://github.com/rmuuu">Montoya, Ram Greggor D.</a> <br>
    <a href="https://github.com/thea23salva">Salva, Dorothy C.</a>
     </p>
</div>

<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

### Project Overview

Magister is a web application designed to champion Filipino workers in the education sector. It functions as a one-stop platform for educators by offering:

## Job Board:
* Employers: Search and connect with qualified Filipino educators nationwide. Filter by specific teaching skills and qualifications.
* Candidates: Showcase your talents and upload your CV for employers to discover.
## Resource Hub:
* Contribute: Share valuable learning resources like lesson plans, worksheets, and other materials to benefit the community.
Download: Access a vast library of free, downloadable resources curated by fellow educators. A search and filter system allows for easy exploration.
# Events:
* Employers: A space for users to freely list upcoming events, seminars, and training.
<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

### Visuals
<div align="center">
<h2 align="center">Login</h3>
    <img src="https://github.com/user-attachments/assets/5b5f69aa-dcba-4098-be43-4e8b8fdfa6b7">
<h2 align="center">Signup</h3>
    <img src="https://github.com/user-attachments/assets/1147a419-a806-471a-b95e-74bb0246627b">
<h2 align="center">Job Board</h3>
    <img src="https://github.com/user-attachments/assets/c08a5d20-823b-4b98-be29-2212ad6d46fe">
<h2 align="center">Resource Hub</h3>
    <img src="https://github.com/user-attachments/assets/8c948e5b-ffc9-4666-ac00-a0d7f434a566">
<h2 align="center">Events</h3>
    <img src="https://github.com/user-attachments/assets/b3736516-b56c-4f29-b23a-c45d26797f00">
</div>



<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

### Features

## User
* Signup:
    Users can create their own account, this will be saved inside the database, all sensitive information like password will be hashed
* Login:
    Users with account will enter their email or username and password to enter the site
* Logout:
    Exit the site, user related activities cannot be done

## Nav Bar
* Nav Bar: 
    Click through different choices to traverse the site

## Job Board
* Job Listing:
    Organizations or users can list a job with this details: Organization or Institution,position, location, remote, work type(full time, part time, internship, or contractual/temporary), salary, and the job description
* Search:
    Find jobs that you want using keywords
* Filter:
    Filter the choices with the things that you want like location, jobType, and remote

## Resource Hub
* Contribute:
    Users can submit their own materials like lessons or governemnt related information that helps job applicants
* Search:
    Find resources that you need
* Filter:
    Filter the number of resources showing by picking from the two bars, and click filter to finish

## Events
* Event Listing:
       Admins or trusted users can post educational events like webinars, training, or certifications.
* Event Application/Registration:
       Interested users can apply or indicate interest in events (e.g., via a simple “Register” button).


## Responsiveness
* Responsive:
    Web app supports different sizes

<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

### List of Dependecies
The development environment utilizes Visual Studio Code as the code editor, leverages the MERN stack (MongoDB, Express.js, React.js, and Node.js) for development, and employs Git for version control with a Github repository for hosting the project.

# Running magister locally on your machine
* Running the web app requires running the API server and the web server

## Running the API Server
**Important!**

* Before proceeding, make sure you have the .env file that contains the credentials for connecting to magister database hosted online. If you do not have it, contact the developers for the file.

### Windows

1. Clone the repository in your machine

2. Navigate to the API folder
```sh
cd Backend
```
3. Download all the dependencies 
```sh
npm install 
```
4. Run the server (make sure nothing is using port 3000 before proceeding)
```sh
node app.js
```
## Running the Web Server
1. Clone the repository in your machine

2. Navigate to the API folder
```sh
cd Frontend
```
3. Download all the dependencies 
```sh
npm install
```
4. Run the server (make sure nothing is using port 5173 before proceeding)
```sh
npm run dev
```
