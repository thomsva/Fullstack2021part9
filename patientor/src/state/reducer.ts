import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT_DATA";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":      
      console.log('SET_PATIENT_LIST');
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":      
      console.log('SET_DIAGNOSES_LIST');
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DATA":
      console.log('ADD_PATIENT_DATA', action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({ type: "SET_PATIENT_LIST", payload: patients });
export const setDiagnoseList = (diagnoses: Diagnosis[]): Action => ({ type: "SET_DIAGNOSES_LIST", payload: diagnoses });
export const addPatient = (patient: Patient): Action => ({ type: "ADD_PATIENT", payload: patient });
export const addPatientData = (patient: Patient): Action => ({ type: "ADD_PATIENT_DATA", payload: patient });