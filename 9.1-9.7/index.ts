import express from 'express';
const app = express();

app.get('/hello', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});