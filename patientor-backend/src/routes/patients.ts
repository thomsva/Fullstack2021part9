import express from 'express';
import patientService from '../services/patientService';
import { toEntryInput, toPatientInput } from '../utils';

const router = express.Router();


router.get('/:id', (_req, res) => {
  console.log(_req.params.id);
  const patient = patientService.getPatientAllInfo(_req.params.id);
  res.send(patient);
});

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toEntryInput(req.body);
    res.send(newEntry);
  } catch (e) {
    res.status(400).send('Could not add entry');
  }
});

router.post('/', (req, res) => {
  try{
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = patientService.addPatient(toPatientInput(req.body));
    res.json(newPatient);
  } catch (e) {
    res.status(400).send('Could not add patient');
  }
});

export default router;