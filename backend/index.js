require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/note');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/notes_demo')
  .then(() => console.log('Mongo connected'))
  .catch(console.error);

app.get('/notes', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(process.env.PORT || 4000, () => console.log('Notes API running'));
