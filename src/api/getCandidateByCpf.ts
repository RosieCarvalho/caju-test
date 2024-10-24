import { api } from '~/libs/axios';

export async function getCandidatesByCpf(cpf: string) {
  const response = await api.get('/registrations', { params: { cpf: cpf } });

  return response.data;
}
