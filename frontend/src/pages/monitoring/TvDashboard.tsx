import { useEffect } from 'react';
import { TvLayout } from '@/components/layout/TvLayout';
import { PatientGrid } from '@/components/patient/PatientGrid';
import { usePatientStore } from '@/store/usePatientStore';

export default function TvDashboard() {
  const { patients, fetchPatients } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <TvLayout>
      <PatientGrid patients={patients} />
    </TvLayout>
  );
}
