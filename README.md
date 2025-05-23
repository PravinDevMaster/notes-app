# MERN Stack Project Setup

This project is a full-stack application using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project is structured with both frontend and backend inside the same root directory.

## Project Structure

```
/root-directory
  ├── backend/      # Express.js backend with MongoDB
  ├── frontend/     # React.js frontend with Vite and Tailwind CSS v4
  ├── README.md     # Project documentation
```

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud-based like MongoDB Atlas)
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup (React with Vite and Tailwind CSS v4)

```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
```

### 4. Running the Project

#### Start Backend Server

```bash
cd backend
npm run dev
```

(Default runs on: `http://localhost:5000`)

#### Start Frontend Server

```bash
cd frontend
npm run dev
```

(Default runs on: `http://localhost:5173` for Vite)

### 5. Running Both Frontend & Backend Separately

Since both frontend and backend have separate `package.json` files, they need to be run individually in different terminals.

## 6. 🧪 Developer Testing (For Local Use Only)

> The following credentials are for personal testing during development:

```bash
  Email: johndoe@example.com
  Password: hashedpassword123
```

```bash
  Email: janesmith@example.com
  Password: hashedpassword456
```

## Deployment

### Backend Deployment

- Use [Render](https://render.com/), [Heroku](https://www.heroku.com/), or [Vercel](https://vercel.com/) for hosting.
- Use `dotenv` to manage environment variables.

### Frontend Deployment

- Use [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- Build the frontend using:
  ```bash
  cd frontend
  npm run build
  ```
- Deploy the `dist/` folder generated by Vite.

## Technologies Used

- **Frontend:** React.js with Vite, React Router, Axios, Tailwind CSS v4
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
