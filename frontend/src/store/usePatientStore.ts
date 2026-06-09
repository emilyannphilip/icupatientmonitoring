import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Patient } from '@/types/patient';

interface PatientStore {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  removePatient: (id: string) => void;
  setPatients: (patients: Patient[]) => void;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    patientName: 'Arun Kumar',
    uhid: '123456789',
    department: 'Cardiology',
    admissionDate: '2026-05-10',
    days: 5,
    diagnosis: 'Acute Myocardial Infarction with severe chest pain, elevated troponin levels and reduced left ventricular function',
    status: 'CRITICAL',
  },
  {
    id: '2',
    patientName: 'Rahul Das',
    uhid: '123456789',
    department: 'Pulmonology',
    admissionDate: '2026-05-08',
    days: 7,
    diagnosis: 'Severe bilateral pneumonia with hypoxia, productive cough and oxygen support requirement',
    status: 'CRITICAL',
  },
  {
    id: '3',
    patientName: 'John Mathew',
    uhid: '123456789',
    department: 'ICU',
    admissionDate: '2026-05-09',
    days: 6,
    diagnosis: 'Septic shock with persistent hypotension, multi-organ dysfunction and ventilator support',
    status: 'CRITICAL',
  },
  {
    id: '4',
    patientName: 'Nikhil Raj',
    uhid: '123456789',
    department: 'Cardiology',
    admissionDate: '2026-05-07',
    days: 8,
    diagnosis: 'Congestive heart failure with pedal edema, breathlessness and reduced ejection fraction',
    status: 'HIGH RISK',
  },
  {
    id: '5',
    patientName: 'Joseph Varghese',
    uhid: '123456789',
    department: 'ICU',
    admissionDate: '2026-05-03',
    days: 12,
    diagnosis: 'Multi organ failure involving renal, respiratory and circulatory systems requiring intensive monitoring',
    status: 'CRITICAL',
  },
  {
    id: '6',
    patientName: 'Rohit Menon',
    uhid: '123456789',
    department: 'Cardiology',
    admissionDate: '2026-05-01',
    days: 14,
    diagnosis: 'Cardiac arrhythmia with intermittent palpitations, dizziness and irregular heart rhythm',
    status: 'STABLE',
  },
  {
    id: '7',
    patientName: 'Daniel James',
    uhid: '123456789',
    department: 'Pulmonology',
    admissionDate: '2026-05-06',
    days: 9,
    diagnosis: 'Acute respiratory distress syndrome with severe hypoxemia and mechanical ventilation support',
    status: 'CRITICAL',
  },
  {
    id: '8',
    patientName: 'Naveen Babu',
    uhid: '123456789',
    department: 'ICU',
    admissionDate: '2026-05-02',
    days: 13,
    diagnosis: 'Sepsis with elevated inflammatory markers, hypotension and altered sensorium',
    status: 'CRITICAL',
  },
  {
    id: '9',
    patientName: 'Priya Suresh',
    uhid: '123456789',
    department: 'Neurology',
    admissionDate: '2026-05-05',
    days: 10,
    diagnosis: 'Bacterial meningitis with neck stiffness, severe headache and altered mental status',
    status: 'CRITICAL',
  },
  {
    id: '10',
    patientName: 'Anita George',
    uhid: '123456789',
    department: 'General Medicine',
    admissionDate: '2026-05-13',
    days: 2,
    diagnosis: 'Malaria with intermittent chills, fever spikes and mild hepatosplenomegaly',
    status: 'STABLE',
  },
  {
    id: '11',
    patientName: 'Meera Joseph',
    uhid: '123456789',
    department: 'Neurology',
    admissionDate: '2026-05-01',
    days: 14,
    diagnosis: 'Acute ischemic brain stroke with right-sided weakness, slurred speech and uncontrolled hypertension',
    status: 'CRITICAL',
  },
  {
    id: '12',
    patientName: 'Anjali Nair',
    uhid: '123456789',
    department: 'Nephrology',
    admissionDate: '2026-05-11',
    days: 4,
    diagnosis: 'Acute kidney injury secondary to dehydration with elevated creatinine and electrolyte imbalance',
    status: 'HIGH RISK',
  },
  {
    id: '13',
    patientName: 'Fathima Ali',
    uhid: '123456789',
    department: 'General Medicine',
    admissionDate: '2026-05-13',
    days: 2,
    diagnosis: 'Dengue fever with thrombocytopenia, high-grade fever and dehydration symptoms',
    status: 'HIGH RISK',
  },
  {
    id: '14',
    patientName: 'Sandra Thomas',
    uhid: '123456789',
    department: 'Pulmonology',
    admissionDate: '2026-05-04',
    days: 11,
    diagnosis: 'COVID-19 viral pneumonia with respiratory distress and high oxygen dependency',
    status: 'CRITICAL',
  },
  {
    id: '15',
    patientName: 'Amina Basheer',
    uhid: '123456789',
    department: 'Neurology',
    admissionDate: '2026-05-12',
    days: 3,
    diagnosis: 'Generalized seizure disorder with recurrent episodes and postictal confusion',
    status: 'HIGH RISK',
  },
  {
    id: '16',
    patientName: 'Greeshma Nair',
    uhid: '123456789',
    department: 'General Medicine',
    admissionDate: '2026-05-14',
    days: 1,
    diagnosis: 'Typhoid fever confirmed by blood culture with abdominal pain and persistent fever',
    status: 'STABLE',
  },
  {
    id: '17',
    patientName: 'Sumi George',
    uhid: '123456789',
    department: 'Nephrology',
    admissionDate: '2026-05-08',
    days: 7,
    diagnosis: 'Chronic renal failure with fluid overload, anemia and dialysis dependency',
    status: 'CRITICAL',
  },
  {
    id: '18',
    patientName: 'Tony Mathew',
    uhid: '123456789',
    department: 'ICU',
    admissionDate: '2026-05-11',
    days: 4,
    diagnosis: 'Respiratory failure with carbon dioxide retention requiring BiPAP ventilation support',
    status: 'CRITICAL',
  },
  {
    id: '19',
    patientName: 'Vijay Kumar',
    uhid: '123456789',
    department: 'Cardiology',
    admissionDate: '2026-05-09',
    days: 6,
    diagnosis: 'Cardiogenic shock following myocardial infarction with low blood pressure and poor perfusion',
    status: 'CRITICAL',
  },
  {
    id: '20',
    patientName: 'Suresh Das',
    uhid: '123456789',
    department: 'Pulmonology',
    admissionDate: '2026-05-07',
    days: 8,
    diagnosis: 'COPD exacerbation with wheezing, productive cough and increased oxygen requirement',
    status: 'HIGH RISK',
  },
];

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: mockPatients,
      isLoading: false,
      error: null,

      fetchPatients: async () => {
        // Just setting isLoading briefly to mimic async fetch
        set({ isLoading: true });
        setTimeout(() => {
          set({ isLoading: false, error: null });
        }, 300);
      },

      addPatient: (patient) =>
        set((state) => {
          const newPatient = { ...patient, id: patient.id || crypto.randomUUID() };
          if (state.patients.find((p) => p.id === newPatient.id)) return state;
          return { patients: [...state.patients, newPatient] };
        }),

      updatePatient: (patient) =>
        set((state) => ({
          patients: state.patients.map((p) => (p.id === patient.id ? patient : p)),
        })),

      removePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        })),

      setPatients: (patients) => set({ patients }),
    }),
    {
      name: 'patient-storage',
    }
  )
);
