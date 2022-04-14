export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export interface HealthCheck extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: 1 | 2 | 3 | 4; 
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheck;

interface SickLeave {
  startDate: string;
  endDate: string;
}
