import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { addPatientData, useStateValue } from '../state';
import { Entry, HealthCheck, HospitalEntry, OccupationalHealthcareEntry, Patient } from '../types';
import { Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import HealthRatingBar from '../components/HealthRatingBar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import CheckIcon from '@mui/icons-material/Check';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [{ patients, diagnoses }, dispatch] = useStateValue();

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

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital': return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare': return <OccupationalHealthcareDetails entry={entry} />;
      case 'HealthCheck': return <HealthCheckDetails entry={entry} />;
      default: return assertNever(entry);
      console.log('entry', entry);
    }
  };

  const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip icon={<LocalHospitalIcon />} label="Hostpital" />
            <Typography variant="h6" ml={2}>{entry.date}</Typography>
          </div>
          <Typography>{entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Discharged on {entry.discharge.date} ({entry.discharge.criteria})</Typography>
          <Stack mt={1} spacing={1}>
            {entry.diagnosisCodes?.map(d => (
              <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
            ))}
          </Stack>
        </CardContent> 
      </Card>
    );
  };


  const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent> 
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip icon={<WorkIcon />} label="Occupational healthcare" />
              <Typography variant="h6" ml={2}>{entry.date}</Typography>
            </div>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {(entry.sickLeave !== undefined)
              ? <Typography>Sickleave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}.</Typography>
              : <Typography>No sick leave.</Typography>}
            <Stack mt={1} spacing={1}>
              {entry.diagnosisCodes?.map(d => (
                <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
              ))}
            </Stack>
        </CardContent> 
      </Card>
    );
  };

  const HealthCheckDetails: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent> 
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip icon={<CheckIcon />} label="Health check" />
            <Typography variant="h6" ml={2}>{entry.date}</Typography>
          </div>
          <Typography>{entry.description}</Typography>
          <Typography>{entry.specialist}</Typography>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography>Health rating: </Typography>
            <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
          </div>
          <Stack mt={1} spacing={1}>
            {entry.diagnosisCodes?.map(d => (
              <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
            ))}
          </Stack>
      </CardContent> 
      </Card>
    );
  };
  
    
  if (!id) return (<div>patient id missing</div>);

  const patient = patients[id];

  if (!patient) return (<div>patient not found in list</div>);
  
    
  return (

    <Card variant="outlined" sx={{ maxWidth:500, mt:3 }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography mr={2} variant="h4">{patient.name}</Typography>
          {(patient.gender === 'male')
            ? <MaleIcon />
            : (patient.gender === 'female')
              ? <FemaleIcon />
              : <TransgenderIcon />}
        </div>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        {(patient.entries !== undefined && patient.entries.length > 0)
          &&
          <>
          <Divider />
          <Typography mt={2} variant="h5">Entries</Typography>
          <Stack spacing={1}>
            {patient.entries.map(e => (<EntryDetails key={e.id} entry={e} />))}
          </Stack>
          </>}
      </CardContent>
    </Card>
  );
};


export default PatientInfoPage;