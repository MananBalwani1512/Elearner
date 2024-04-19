# Elearning Backend API

## Overview

The Elearning Backend API project serves as the backend for an Elearning platform. It comprises various files that collectively function as a node backend, utilizing dependencies such as Express.js, Cloudinary for profile photo uploads, Resend API for registration and course enrollment emails, bcryptjs for password encryption, and Neon database for data storage. The project is developed within the Express framework of Node.js.

## Features

1. User Access:
   - Users can access course details through server-side filtering and pagination.
   - Admins can add, delete, and update courses.
   - Email notifications are sent upon user registration and course enrollment.
   - Access rights are granted to different user roles such as admin and user.

## Usage

1. **Installation**:
   - Clone or download the repository.
   - Navigate to the project directory in the terminal and run `npm install` to install dependencies.

2. **Database Setup**:
   - Modify the database connection string in `datalayer/connector.js`.
   - Use the provided SQL code in `/datalayer/sql/db.sql` to create tables named `users`, `course`, and `user_course_enroll` in the Neon database.

3. **Configuration**:
   - Update email credentials in `emailSender.js`.
   - Update Cloudinary credentials in `cloud.js`.

4. **Server Startup**:
   - Navigate to the `server` folder and execute `users.js` and `courses.js` to start the server on ports 5000 and 5001, respectively.

5. **API Endpoints**:

   ### URLs for User Operations
   - **Add User**:
     - URL: `localhost:5000/addUser`
     - Request Type: POST
     - Request Headers: `Content-type: multipart/form-data`
     - Data: `name`, `email`, `password`, `profilePic`

   - **Update User**:
     - URL: `localhost:5000/updateUser`
     - Request Type: POST
     - Request Headers: `Content-type: multipart/form-data`
     - Data: `id`, `name`, `email`, `password`, `profilePic`

   - **Delete User**:
     - URL: `localhost:5000/deleteUser`
     - Request Type: POST
     - Request Headers: `Content-type: multipart/form-data`
     - Data: `id`

   - **Authenticate User**:
     - URL: `localhost:5000/authenticateUser`
     - Request Type: POST
     - Request Headers: `Content-type: multipart/form-data`
     - Data: `email`, `password`

   - **Get User by Email**:
     - URL: `localhost:5000/getUserByEmail`
     - Request Type: GET
     - Data: query string is formed by appending `?email='user email here'`.

   ### URLs for Course Operations
   - **Get All Courses**:
     - URL: `localhost:5001/getAllCourses`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`
     - Data: JSON with `pageSize`, `pageNumber`, and filtering criteria.

   - **Add Course**:
     - URL: `localhost:5001/addCourse`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`, `role: admin`
     - Data: JSON with `name`, `category`, `popularity`, `level`.

   - **Update Course**:
     - URL: `localhost:5001/updateCourse`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`, `role: admin`
     - Data: JSON with `id`, `name`, `category`, `popularity`, `level`.

   - **Delete Course**:
     - URL: `localhost:5001/deleteCourse`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`, `role: admin`
     - Data: JSON with `id`.

   ### URLs for User Enrollment Operations
   - **Enroll User in Course**:
     - URL: `localhost:5001/enrollUserInCourse`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`
     - Data: JSON with `courseId`, `userId`.

   - **Unenroll User in Course**:
     - URL: `localhost:5001/unenrollUserInCourse`
     - Request Type: POST
     - Request Headers: `Content-type: application/json`
     - Data: JSON with `courseId`, `userId`.

## Testing

- **Success**: Each service responds with JSON, including a `success` parameter indicating the success of the operation. Data is returned where applicable.
- **Exception Handling**: In case of failure, the response includes an `exception` parameter specifying the cause of the failure.

## Conclusion

This README provides an overview of the Elearning Backend API project, including its features, usage instructions, testing procedures, and conclusion.

---

For more detailed instructions and examples, refer to the README file in the project repository.
