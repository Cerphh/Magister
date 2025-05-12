export interface UserData {
  uid: string;
  email: string | null;
  token: string;
  displayName: string;
  role: string;
  location?: string;
  subjects?: string[];
  teachingLevel?: string[];
  about?: string;
  companyName?: string;
  companyType?: string;
  updatedAt?: any;
  [key: string]: any; // allow any additional fields
}
