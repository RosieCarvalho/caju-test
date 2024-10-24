import { api } from '~/libs/axios';

export async function deleteCandidate(id: string) {
  const response = await api.delete(`/registrations/${id}`);

  return response.data;
}
