import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, _res) => {
    const { height, weight } = _req.query;
    console.log('height',height);
    console.log('weight',weight);

    if ( !height || isNaN(Number(height))) {
        return _res.send({ error: 'Valid height missing'}).status(400);
    }
    if ( !weight || isNaN(Number(weight))) {
        return _res.send({ error: 'Valid weight missing'}).status(400);
    }

    return _res.send(calculateBmi(Number(height), Number(weight)));
  });
  

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});