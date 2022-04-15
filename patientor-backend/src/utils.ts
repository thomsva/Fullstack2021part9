import { 
  PatientInput,
  Gender,
  Diagnosis,
  EntryInput,
  BaseEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  SickLeave,
  Discharge
} from './types';

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

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


export const toEntryInput = (input: unknown): EntryInput => {

  const entry = input as EntryInput;

  const newBaseEntry: Omit<BaseEntry,'type'| 'id'> = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
  };

  switch (parseType(entry.type))
  {
    case 'Hospital':
      if (entry.specialist !== 'MD House') {
        throw new Error('Invalid specialist');
      }
      const newHospitalEntry: Omit<HospitalEntry, 'id'> = {
        ...newBaseEntry,
        specialist: 'MD House',
        type: 'Hospital',
        discharge: parseDischarge((entry as HospitalEntry).discharge)
      };
      return newHospitalEntry;

      
    case 'OccupationalHealthcare':
      if ((entry as OccupationalHealthcareEntry).sickLeave) {
        const newOccupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
          ...newBaseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString((entry as OccupationalHealthcareEntry).employerName),
          sickLeave: parseSickLeave((entry as OccupationalHealthcareEntry).sickLeave)
        };
        return newOccupationalEntry;
      }
      const newOccupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
          ...newBaseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseString((entry as OccupationalHealthcareEntry).employerName),
        };
        return newOccupationalEntry;

    case 'HealthCheck':
      if (!(entry as HealthCheckEntry).healthCheckRating) {
        throw new Error('Invalid or missing Health Check Rating');
      }
      const newHealthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parsehealthCheckRating((entry as HealthCheckEntry).healthCheckRating)
      };
      return newHealthCheckEntry;
    default:
      throw new Error('Invalid entry');
  }
};

const parsehealthCheckRating = (input: unknown): 0 | 1 | 2 | 3 => {
  if (!input) {
    throw new Error('Invalid rating');
  }
  const rating = Number(input);
  switch (rating) {
    case 1 || 2 || 3 || 4:
      return rating;
    default:
      throw new Error('Invalid rating');
  }
};

const parseSickLeave = (input: unknown): SickLeave => {
  if (!input) {
    throw new Error('Invalid sickleave');
  }
  return {
    startDate: parseDate((input as SickLeave).startDate),
    endDate: parseDate((input as SickLeave).endDate)
  };

};

const parseDischarge = (input: unknown): Discharge => {
  return {
    date: parseDate((input as Discharge).date),
    criteria: parseString((input as Discharge).criteria)
  };
};

const parseType = (input: unknown): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  const inputString = parseString(input);
  switch (inputString) {
    case 'Hospital' || 'HealthCheck' || 'OccupationalHealthcare':
      return inputString;
    default: 
      throw new Error('Invalid entry type');
  }
};

const parseDiagnosisCodes = (input: unknown): Array<Diagnosis["code"]> => {
  if (input === undefined) return [];
  if (!Array.isArray(input)) {
    throw new Error('Invalid diagnosis codes');
  }
  const newCodes = input.map(c => parseString(c));
  return newCodes;
};

const parseString = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid string input: ' + input); 
  }
  return input;
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