export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
} 

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  specialist: string;
  discharge: Discharge
}
  
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: 0 | 1 | 2 | 3; 
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientInput = Omit<Patient, 'id' | 'entries'>;

export type EntryInput =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;


export enum Gender {
  Female = 'female',
  Male = 'male', 
  Other = 'other'
}