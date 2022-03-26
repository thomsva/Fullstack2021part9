import { 
  PatientInput,
  Gender
} from './types';

type patientInputFields = {
  name: unknown, 
  dateOfBirth: unknown,
  gender: unknown,
  ssn: unknown,
  occupation: unknown
};

export const toPatientInput = ({name, dateOfBirth, gender, ssn, occupation}: patientInputFields): PatientInput => {
  return ({
    name: parseName(name), 
    dateOfBirth: parseDate(dateOfBirth), 
    gender: parseGender(gender), 
    ssn: parseSsn(ssn), 
    occupation: parseOccupation(occupation)
  });
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name); 
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing Ssn: ' + ssn); 
  }
  return ssn;
};

const parseOccupation = (occ: unknown): string => {
  if (!occ || !isString(occ)) {
    throw new Error('Incorrect or missing Ssn: ' + occ); 
  }
  return occ;
};