const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/movies', (req, res) => {
  res.json([
    { "name": "Inside Out", "genre": "Animation", "mood": "Happy" },
    { "name": "Titanic", "genre": "Romance", "mood": "Sad" },
    { "name": "Avengers", "genre": "Action", "mood": "Excited" },
    { "name": "The Conjuring", "genre": "Horror", "mood": "Scary" },
    { "name": "La La Land", "genre": "Musical", "mood": "Romantic" }
  ]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
