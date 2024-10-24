import * as S from './styles';
import CandidateCard from '../CandidateCard';
import { CandidatesContext } from '~/context/CandidatesContext';
import { useContext } from 'react';

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
];
const Collumns = () => {
  const { candidatesByStatus } = useContext(CandidatesContext);

  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {candidatesByStatus[collum.status]?.map((candidate) => {
                  return (
                    <CandidateCard candidate={candidate} key={candidate.id} />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
