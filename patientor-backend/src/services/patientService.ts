import patientData from '../../data/patients.json';
import { Patient, PublicPatient, PatientInput } from '../types';
import { v1 as uuid } from 'uuid';


const patients: Array<Patient> = patientData;

const getPatients = (): Array<PublicPatient> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ssn, ...publicData}) => publicData);
};

const getPatientAllInfo = (id: string): Patient | undefined => {
  return patients.find((p: Patient) => p.id === id);
};

const addPatient = (newPatient: PatientInput): Patient => {
  console.log('newPatient:', newPatient);
  //const patient = {id: uuid(), ...newPatient}
  patientData.push({id: uuid(), entries: [], ...newPatient});
  return {id: uuid(), entries: [], ...newPatient};
};


export default {
  getPatients,
  addPatient,
  getPatientAllInfo
};
