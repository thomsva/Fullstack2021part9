// import { RestoreOutlined } from '@material-ui/icons';

import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';

import { useStateValue } from '../state';
import { Patient } from '../types';






const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return (<div>patient id missing</div>);
  
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
          );
          console.log('from api',patientFromApi);
          
          dispatch({ type: "ADD_PATIENT_DATA", payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }, [id, dispatch]);
  
  if (!patient) return (<div>patient not found</div>);

  return (

    <>
      <div>{patient.name} </div>
      <div>{patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>{patient.dateOfBirth}</div>
      <div>{patient.occupation}</div>
    
    </>
  );
};


export default PatientInfoPage;