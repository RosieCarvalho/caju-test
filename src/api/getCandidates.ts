import { api } from '~/libs/axios';

export async function getCandidates() {
  const response = await api.get('/registrations');

  return response.data;
}
