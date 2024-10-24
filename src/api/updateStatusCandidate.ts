import { api } from '~/libs/axios';
import { CandidateType } from '~/pages/Dashboard/types';

export async function updateStatusCandidate(id: string, data: CandidateType) {
  const response = await api.put(`/registrations/${id}`, data);

  return response.data;
}
