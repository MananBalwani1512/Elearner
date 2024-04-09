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
  1. First Download the folder or clone it.
  2. Then setup your project by setting details in .env file for database in datalayer/connector.js by changing connection string.
  3. Then change your credentials for the emailSender.js andd your own credentials.
  4. Then change your credentials in cloud.js.
  5. Now just go in server folder and execute files users.js and courses.js.
  6. This will start the server on ports 5000 and 5001 respectively.
  7. The users.js has all operations related to user CRUD operations only.
  8. The courses.js has all CRUD operations related to courses and allows user to enroll or unenroll from a course.
# Conclusion
  This is all about my project about backend development for Elearning website.
  
