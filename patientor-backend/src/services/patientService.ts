import patientData from '../../data/patients.json';
import { Patient, PatientPublic, PatientInput } from '../types';
import { v1 as uuid } from 'uuid';


const patients: Array<Patient> = patientData;

const getPatients = (): Array<PatientPublic> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ssn, ...publicData}) => publicData);
};

const addPatient = (newPatient: PatientInput): Patient => {
  console.log('newPatient:', newPatient);
  
  //const patient = {id: uuid(), ...newPatient}
  patientData.push({id: uuid(), ...newPatient});
  return {id: uuid(), ...newPatient};
};


export default {
  getPatients,
  addPatient
};
