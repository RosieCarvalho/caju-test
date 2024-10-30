import { format } from 'date-fns';
import { api } from '~/libs/axios';
import { NewCandidateType } from '~/pages/NewUser/types';
import { ptBR } from 'date-fns/locale/pt-BR';

export async function createCandidate(data: NewCandidateType) {
  const response = await api.post(`/registrations`, {
    ...data,
    status: 'REVIEW',
    admissionDate: format(data.admissionDate, 'dd/MM/yyyy', { locale: ptBR }),
  });
  return response.data;
}
