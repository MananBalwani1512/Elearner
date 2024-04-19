# Elearning API
# Overview
  1. The Project consists of various files which as a whole help as a node backend to an E learning platform.
  2. The Project uses dependencies like express.js, Cloudinary cloud platform to upload profile photos, Resend API to send mails for registration and course enrollment,bcryptjs for encrypting password and neon database for storing data.
  3. The project is all developed in express framework of node.js.
# Features
  1. The project provides the user access courses by using filters and pagination from server side only.
  2. The project helps admin only to add, delete, update courses.
  3. It also provides feature of sendin email when user registers and when a user enrolls in a course.
  4. It provides access rights to different users such as admin and user.
# Steps Of Usage
  1. First Download the folder or clone it and then in terminal in the folder directory run command npm i to install necessary packages.
  2. Then setup your project by setting deatils for database in datalayer/connector.js by changing connection string.
  3. Create tables in neon db named as users,course,user_course_enroll the code of the table creation is provided in /datalayer/sql/db.sql file to create schema of the database.
  4. Then change your credentials for the emailSender.js andd your own credentials.
  5. Then change your credentials in cloud.js.
  6. Now just go in server folder and execute files users.js and courses.js.
  7. This will start the server on ports 5000 and 5001 respectively.
  8. The users.js has all operations related to user CRUD operations only.
  9. The courses.js has all CRUD operations related to courses and allows user to enroll or unenroll from a course.
  10. Then Download any Application which can send request to the server of the GET and POST type.
# URLs for the User.
  ## localhost:5000/addUser
    Request Type : POST
  ### Request Headers
      Content-type : multipart/form-data
  ### Data
      name : string
      email : string
      password : string
      profilePic : file
  ## localhost:5000/updateUser
    Request Type : POST
  ### Request Headers
      Content-type : multipart/form-data
  ### Data
      id : integer
      name : string
      email : string
      password : string
      profilePic : file
  ## localhost:5000/deleteUser
    Request Type : POST
  ### Request Headers
      Content-type : multipart/form-data
  ### Data
      id : integer
  ## localhost:5000/authenticateUser
    Request Type : POST
  ### Request Headers
      Content-type : multipart/form-data
  ### Data
      email : string
      password : string
  ## localhost:5000/getUserByEmail
    Request Type : GET
  ### Data
      query string is formed by appending ?email='user email here'.
  # URLs for the Course
  ## localhost:5001/getAllCourses
    Request Type : POST
  ### Request Headers
      Content-type : application/json
  ### Data
      {
        "pageSize" : integer,
        "pageNumber" : integer
        "name of attribute(according to database) by which you want to filter" : 
        {
          "operation" : any one from gt,lt,gteq,lteq,eq,
          "type" : text (if applicable),
          "value" : "value by which comparison will be done"
        }
      }
  ## localhost:5001/addCourse
    Request Type : POST
  ### Request Headers
      Content-type : application/json
      role : admin
  ### Data
      {
        "name" : string,
        "category" : string,
        "popularity" : integer,
        "level" : string
      }
  ## localhost:5001/updateCourse
    Request Type : POST
  ### Request Headers
      Content-type : application/json
      role : admin
  ### Data
      {
        "id" : integer,
        "name" : string,
        "category" : string,
        "popularity" : integer,
        "level" : string
      }
  ## localhost:5001/deleteCourse
    Request Type : POST
  ### Request Headers
      Content-type : application/json
      role : admin
  ### Data
      {
        "id" : integer
      }
  # URLs for the user to enroll/unenroll in the course
  ## localhost:5001/enrollUserInCourse
    Request Type : POST
  ### Request Headers
      Content-type : application/json
  ### Data
      {
        "courseId" : integer,
        "userId" : integer
      }
  ## localhost:5001/unenrollUserInCourse
    Request Type : POST
  ### Request Headers
      Content-type : application/json
  ### Data
      {
        "courseId" : integer,
        "userId" : integer
      }
# Testing 
  ## Success
    Each service gives response as JSON and includes two on parameter success
  ### Note Some methods return data so response does not include success parameter.But if they fail then success is setted as false.
  The success prameter gives the success of the operation or the method returns the data which it has to fetch.
  ## exception
    The exception parameter is present in the response if the success is false else theor is no exception parameter.
    It contains the cause of the failure of the operation.
# Conclusion
  This is all about my project about backend development for Elearning website.
