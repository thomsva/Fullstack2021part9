import express from 'express';
import patientService from '../services/patientService';
import { toPatientInput } from '../utils';

const router = express.Router();


router.get('/:id', (_req, res) => {
  console.log(_req.params.id);
  // res.send(patientService.getPatients());
  res.send(patientService.getPatients().find(p => p.id === _req.params.id));
});

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try{
    console.log('hep');
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = patientService.addPatient(toPatientInput(req.body));
    res.json(newPatient);
  } catch (e) {
    res.status(400).send('Could not add patient');
  }
});

export default router;