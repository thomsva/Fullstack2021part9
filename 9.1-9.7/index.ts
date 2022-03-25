import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3005;
app.use(express.json());


app.get('/hello', (_req, _res) => {
  _res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  console.log('height',height);
  console.log('weight',weight);

  if ( !height || isNaN(Number(height))) {
      return res.send({ error: 'Valid height missing'}).status(400);
  }
  if ( !weight || isNaN(Number(weight))) {
      return res.send({ error: 'Valid weight missing'}).status(400);
  }
  return res.send(calculateBmi(Number(height), Number(weight)));
});


app.post('/exercises',  (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.target || !req.body.daily_exercises){
    return res.status(400).json({'error': 'parameters missing'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  const inputHours: [number] = req.body.daily_exercises.map((x: any) => Number(x));
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types, @typescript-eslint/no-unsafe-member-access
  const inputTarget: number = Number(req.body.target);
  
  if(inputHours === undefined || inputTarget === undefined){
    return res.status(400).json({'error': 'parameters missing'});
  }
  if(Number.isNaN(inputTarget) || inputHours.filter(x => Number.isNaN(x)).length !== 0 ){
    return res.status(400).json({'error': 'malformatted parameters'});
  }
  return res.json(calculateExercises({
      hours: inputHours, 
      target: inputTarget
  }));
});
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});