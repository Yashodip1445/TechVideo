import express from 'express';
import mongoose from 'mongoose';

const { MONGO_URI, ADMIN_KEY } = process.env;
if (!MONGO_URI || !ADMIN_KEY) throw new Error('Set MONGO_URI and ADMIN_KEY in .env');
await mongoose.connect(MONGO_URI);
const Lesson = mongoose.model('Lesson', new mongoose.Schema({
  title: String, videoId: String, questions: [{ prompt: String, choices: [String], correct: Number }]
}, {timestamps:true}));
const Attempt = mongoose.model('Attempt', new mongoose.Schema({
  lesson: mongoose.Schema.Types.ObjectId, answers: [Number], score: Number
}, {timestamps:true}));
const app = express();
app.use(express.json({limit:'64kb'}));
app.get('/api/lessons', async (_, res) => res.json(await Lesson.find().select('-questions.correct').sort('-createdAt')));
app.post('/api/lessons', async (req, res) => {
  if (req.get('X-Admin-Key') !== ADMIN_KEY) return res.status(403).json({error:'Check the admin key.'});
  const {title, videoId, questions} = req.body ?? {};
  const hasText = value => typeof value === 'string' && value.trim().length > 0;
  const validQuestion = q => q && hasText(q.prompt) && Array.isArray(q.choices) &&
    q.choices.length === 3 && q.choices.every(hasText) && [0,1,2].includes(q.correct);
  if (!hasText(title) || !/^[\w-]{11}$/.test(videoId ?? '') || !Array.isArray(questions) ||
      !questions.length || !questions.every(validQuestion)) return res.status(400).json({error:'Check the title, YouTube video ID, and quiz fields.'});
  const lesson = await Lesson.create({title, videoId, questions});
  res.status(201).json({id:lesson.id});
});
app.post('/api/lessons/:id/attempts', async (req,res) => {
  const lesson = mongoose.isObjectIdOrHexString(req.params.id) && await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({error:'Lesson unavailable.'});
  const answers = req.body?.answers;
  if (!Array.isArray(answers) || answers.length !== lesson.questions.length ||
      !answers.every(a => [0,1,2].includes(a))) return res.status(400).json({error:'Answer every question.'});
  const score = lesson.questions.filter((q,i) => q.correct === answers[i]).length;
  await Attempt.create({lesson:lesson._id, answers, score});
  res.json({score,total:answers.length});
});
app.use((err,req,res,next) => res.status(err.status || 500).json({error:'Unable to complete request.'}));
app.listen(4000,'127.0.0.1', () => console.log('API listening on localhost:4000'));
