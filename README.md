# College Admission System

A simple web-based College Admission System where students can fill a form and admins can log in to view, edit, or delete student data.

## Features

- **Student Form**: Students can submit their admission applications online
- **Admin Dashboard**: Admins can log in to view all applications
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Data Storage**: JSON file-based data storage
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Data Storage**: JSON file (submissions.json)

## Local Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Open your browser and go to: http://localhost:3000
   - Student Form: http://localhost:3000
   - Admin Login: http://localhost:3000/admin.html

## Admin Credentials

- **Username**: admin
- **Password**: admin123

## Free Deployment Options

### Option 1: Render (Recommended - Easy & Free)

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com and sign up

2. **Install Git** (if not already installed)
   - Download from https://git-scm.com/

3. **Upload Your Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

4. **Deploy on Render**
   - Go to https://render.com and sign up (use your GitHub account)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: college-admission-system (or any name)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://your-app-name.onrender.com`

### Option 2: Railway.app (Alternative)

1. **Upload Code to GitHub** (same as above)

2. **Deploy on Railway**
   - Go to https://railway.app and sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect Node.js and deploy
   - Your app will be live at a generated URL

### Option 3: Cyclic.sh (Simple Alternative)

1. **Upload Code to GitHub** (same as above)

2. **Deploy on Cyclic**
   - Go to https://cyclic.sh and sign up with GitHub
   - Click "Link Your Own" → Select your repository
   - Click "Connect" and wait for deployment
   - Your app will be live at a generated URL

## Important Notes for Deployment

- The app uses a JSON file for storage, so data will be reset if the server restarts on free hosting
- For production use, consider using a proper database (MongoDB, PostgreSQL, etc.)
- The admin password is hardcoded - change it in `server.js` for security
- Free tier hosting may sleep after inactivity (takes 30s to wake up)

## Project Structure

```
Admission Form/
│
├── public/
│   ├── index.html        # Student admission form
│   ├── admin.html        # Admin login & dashboard
│   ├── style.css         # All styling
│   ├── script.js         # Student form JavaScript
│   └── admin.js          # Admin dashboard JavaScript
│
├── server.js             # Express server & API routes
├── package.json          # Project dependencies
├── submissions.json      # Data storage (auto-created)
└── README.md            # This file
```

## API Endpoints

- `POST /api/submit` - Submit student application
- `POST /api/admin/login` - Admin login
- `GET /api/students` - Get all students
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## Troubleshooting

### Local Issues

- **Port already in use**: Change the PORT in server.js
- **Module not found**: Run `npm install` again

### Deployment Issues

- **Build fails**: Ensure package.json has correct dependencies
- **App crashes**: Check Render/Railway logs for errors
- **Can't access app**: Wait 30s if using free tier (it sleeps when inactive)

## Demo for Teacher

After deployment, share the live URL:
- **Student Form**: `https://your-app-name.onrender.com`
- **Admin Dashboard**: `https://your-app-name.onrender.com/admin.html`
- **Admin Login**: username: `admin`, password: `admin123`

## License

This project is for educational purposes.
