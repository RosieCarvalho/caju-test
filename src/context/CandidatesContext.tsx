import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCandidate } from '~/api/deleteCandidate';
import { getCandidatesByCpf } from '~/api/getCandidateByCpf';
import { getCandidates } from '~/api/getCandidates';
import { updateStatusCandidate } from '~/api/updateStatusCandidate';
import {
  CandidatesByStatusType,
  CandidateType,
  StatusType,
} from '~/pages/Dashboard/types';

interface CandidateContextType {
  candidatesByStatus: CandidatesByStatusType;
  loadingDashboard: boolean;
  filterCandidateByCpf: (cpf: number) => void;
  collumnsCandidates: (candidates?: any) => void;
  listCandidates: () => void;
  updateStatus: (data: CandidateType, status: StatusType) => void;
  removeCandidate: (id: string) => void;
}
interface CandidatesProviderProps {
  children: ReactNode;
}
export const CandidatesContext = createContext({} as CandidateContextType);

export function CandidatesProvider({ children }: CandidatesProviderProps) {
  const [candidatesByStatus, setCandidatesByStatus] =
    useState<CandidatesByStatusType>({});
  const [candidates, setCandidates] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  const listCandidates = async () => {
    try {
      setLoadingDashboard(true);
      const candidates = await getCandidates();
      setCandidates(candidates);
    } catch (err) {
      toast.error('Erro ao buscar candidatos, tente novamente!');
    } finally {
      setLoadingDashboard(false);
    }
  };
  const collumnsCandidates = async (candidatesList = candidates) => {
    try {
      const candidatesByStatus = candidatesList.reduce(
        (candidatesList: CandidatesByStatusType, candidate: CandidateType) => {
          const status = candidate.status;
          if (!candidatesList[status]) {
            candidatesList[status] = [];
          }
          candidatesList[status].push(candidate);
          return candidatesList;
        },
        {},
      );
      setCandidatesByStatus(candidatesByStatus);
    } catch {
      toast.error('Erro ao listar candidatos, tente novamente!');
    }
  };

  const filterCandidateByCpf = async (cpf: number) => {
    try {
      setLoadingDashboard(true);

      const candidate = await getCandidatesByCpf(cpf);
      collumnsCandidates(candidate);
      !candidate.length &&
        toast('Candidato não encontrado!', {
          style: {
            background: '#FDF8E9',
            color: '#11111',
          },
        });
    } catch {
      toast.error('Erro ao buscar candidato, tente novamente!');
    } finally {
      setLoadingDashboard(false);
    }
  };

  const updateStatus = async (data: CandidateType, status: StatusType) => {
    try {
      setLoadingDashboard(true);

      await updateStatusCandidate(data.id, { ...data, status });
      await listCandidates();
      toast.success('Atualizado com sucesso!');
    } catch {
      toast.error('Erro ao tentar atualizar status, tente novamente!');
    } finally {
      setLoadingDashboard(false);
    }
  };

  const removeCandidate = async (id: string) => {
    try {
      setLoadingDashboard(true);
      await deleteCandidate(id);
      await listCandidates();
      toast.success('Candidato removido com sucesso!');
    } catch (err) {
      toast.error('Erro ao tentar remover candidato, tente novamente!');
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    listCandidates();
  }, []);

  useEffect(() => {
    collumnsCandidates(candidates);
  }, [candidates]);
  return (
    <CandidatesContext.Provider
      value={{
        updateStatus,
        loadingDashboard,
        removeCandidate,
        candidatesByStatus,
        collumnsCandidates,
        filterCandidateByCpf,
        listCandidates,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
}
