import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { addPatientData, useStateValue } from '../state';
import { Patient } from '../types';
import { Card, CardContent, Typography } from '@mui/material';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id !== undefined) {
          // Only get data if ssn is missing
          if (patients[id].ssn === undefined) {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatientData(patientFromApi));
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);
    
  if (!id) return (<div>patient id missing</div>);

  const patient = patients[id];

  if (!patient) return (<div>patient not found in list</div>);
    
  return (

    <Card sx={{ maxWidth:400, mt:3 }}>
      <CardContent>
        <Typography variant="h4">{patient.name}</Typography>
        {(patient.gender === 'male')
          ? <MaleIcon />
          : (patient.gender === 'female')
            ? <FemaleIcon />
            : <TransgenderIcon />}
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </CardContent>
    </Card>
  );
};


export default PatientInfoPage;