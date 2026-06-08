export type Designation = 
  | 'ICU Doctor' 
  | 'Duty Doctor' 
  | 'Consultant Doctor' 
  | 'ICU Nurse' 
  | 'Senior Nurse' 
  | 'Chief Nurse' 
  | 'ICU Administrator' 
  | 'Hospital Administrator' 
  | 'Reception Staff'
  | 'Admin'
  | 'Doctor'
  | 'Nurse'
  | 'Technician'
  | 'Receptionist'
  | 'Staff';

export interface User {
  id: string;
  fullName: string;
  username: string;
  empId?: string;
  email?: string;
  designation: Designation;
  status?: string;
  profilePicture?: string;
}
