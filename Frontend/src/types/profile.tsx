// src/types/profile.tsx

export interface BaseProfileData {
  uid?: string;
  displayName?: string;
  location?: string;
  about?: string;
}

export interface ApplicantProfileData extends BaseProfileData {
  role: 'applicant';
  subjects?: string[];
  teachingLevel?: string[];
}

export interface EmployerProfileData extends BaseProfileData {
  role: 'employer';
  companyName?: string;
  companyType?: string;
}

export type ProfileData = ApplicantProfileData | EmployerProfileData;
