# TechVideo

A localhost MERN learning studio for publishing technical video lessons and quizzes. Students can watch videos, submit an assessment and see a score. Attempts are stored in MongoDB.

## Windows setup

Install Node.js 22.12+ and MongoDB Community Server. Start the MongoDB service, or use a MongoDB Atlas connection string in .env.

```powershell
git clone https://github.com/Yashodip1445/TechVideo.git
cd TechVideo
Copy-Item .env.example .env
npm install
npm run dev
```

Edit ADMIN_KEY in .env to a private value before starting. Open the local URL Vite prints (usually http://localhost:5173). Under Creator studio enter that key, a video title, and the 11-character YouTube video ID (the value after v= in a watch URL). Edit the three sample Java array questions as needed and publish. Open Lessons and take the quiz.

The API binds to localhost:4000. Keep .env private. The app embeds videos that allow embedding. This first release covers publishing and assessments. AI hints, timed mock tests, and interviews are future modules.
