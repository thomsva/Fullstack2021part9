export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
} 

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  specialist: 'MD House';
  discharge: Discharge
}
  
interface Discharge {
  date: string;
  criteria: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: 'HyPD';
  sickLeave?: SickLeave;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientInput = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
  Female = 'female',
  Male = 'male', 
  Other = 'other'
}