import express from 'express';
import patientService from '../services/patientService';
//import { PatientInput } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {name, dateOfBirth, gender, ssn, occupation} = req.body;
  const newPatient = patientService.addPatient({
    name, 
    dateOfBirth, 
    gender, 
    ssn, 
    occupation
  });
  res.json(newPatient);
});


export default router;