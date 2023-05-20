# Entire_backend
This is the entire backend for an educational site where Admin can upload video courses, and student can enroll in courses.

Some of the implemented features:

1. User Registration and Login:
   - User registration and login routes are implemented.
   - Passwords are securely hashed using the `bcrypt` package.
   - JSON Web Tokens (JWTs) are generated upon successful login.
   - Existing user check is implemented to prevent duplicate usernames.

2. Admin Portal:
   - Routes for creating, updating, and deleting courses are implemented.
   - Multer is used for handling file uploads (videos).

3. Course Management:
   - Routes for retrieving available courses and enrolling students are implemented.
   - The Course model is created and includes enrollment details.

4. Database Integration:
   - MongoDB connection is established using Mongoose.
   - User and Course models are defined to interact with the MongoDB database.
   - Video courses are stored in the MongoDB database using GridFS.

5. Authentication and Authorization:
   - User authentication is implemented using JWTs.
   - Authentication middleware is not needed in the current implementation.

Overall, the implemented code covers several key features of the project, including user registration, login, admin portal, course management, database integration, and basic authentication.

