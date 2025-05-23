## 🚀 Tech Stack

- **Node.js** – Server-side runtime
- **Express.js** – Web framework for routing and middleware
- **MySQL** – Relational database for storing users and blog posts
- **Multer** – For handling image uploads
- **Dotenv** – For environment variable management
- **CORS & Body-Parser** – Middleware for cross-origin requests and body parsing




## 💡 My Development Approach

1. **Project Setup**: Initialized the Node.js project with essential dependencies and folder structure.
2. **Authentication**: Implemented secure login/register with hashed passwords and JWT tokens.
3. **Blog Management**: Built endpoints for CRUD.
4. **Image Handling**: Integrated `multer` middleware to support image upload and retrieval.
5. **Security & Middleware**: Added middlewares like CORS.
6. **Testing**: Manually tested APIs using Postman and ensured correct integration with the frontend.


##🖥Demonstration

 https://drive.google.com/file/d/1yy3lSRixYIrMBpASGyX8mjgh2YcQcJwd/view?usp=drivesdk


## 🔒 Environment Variables (`.env`)

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=blogdb
JWT_SECRET=your_jwt_secret


## 🤖 ChatGPT Assistance

Throughout development, I used **ChatGPT** to:

- Design the REST API structure
- Resolve issues with Express routing and middleware
- Integrate Multer for image uploads
- Implement JWT-based authentication
- Get suggestions for proper error handling and best practices
- Write efficient and readable code
- Troubleshoot Git/GitHub errors

This improved my learning curve and helped deliver clean, functional code.

---




## 🔧 Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/thebhamaree/MindBowser_Backend.git
   cd MindBowser_Backend
Install Dependencies

npm install
--Configure Environment Variables

--Create a .env file in the root:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blogdb
JWT_SECRET=your_jwt_secret


--Create MySQL Database
CREATE DATABASE blogdb;

--Start the Server
npm start

--Backend runs on: http://localhost:5000


## 🤝 Author

**Harshal Bhamare**  
Full-Stack Developer  
[GitHub Profile](https://github.com/thebhamaree)
