export type StatusType = 'REVIEW' | 'APROVED' | 'REPROVED';

export interface CandidateType {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: StatusType;
  cpf: string;
  id: string;
}

export interface CandidatesByStatusType {
  [key: string]: CandidateType[];
}
