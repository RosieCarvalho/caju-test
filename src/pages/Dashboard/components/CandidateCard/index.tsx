import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi';
import { CandidatesContext } from '~/context/CandidatesContext';
import { useContext } from 'react';
import { CandidateProps } from './types';
import { CandidateType, StatusType } from '~/pages/Dashboard/types';
import ToastConfirm from '~/components/ToastConfirm';

const buttonsActions = [
  {
    color: 'rgb(255, 145, 154)',
    status: 'REPROVED',
    title: 'Reprovar',
  },
  {
    color: 'rgb(155, 229, 155)',
    status: 'APROVED',
    title: 'Aprovar',
  },
  {
    color: '#ff8858',
    status: 'REVIEW',
    title: ' Revisar novamente',
  },
];

const statusDescription = {
  REVIEW: 'Revisar',
  APROVED: 'Aprovar',
  REPROVED: 'Reprovar',
};

const CandidateCard = ({ candidate }: CandidateProps) => {
  const { removeCandidate, updateStatus } = useContext(CandidatesContext);

  const confirmRemove = () => {
    ToastConfirm(`Tem certeza que deseja deletar o candidato?`, () =>
      removeCandidate(candidate.id),
    );
  };

  const confirmUpdate = (candidate: CandidateType, status: StatusType) => {
    ToastConfirm(
      `Tem certeza que deseja  ${statusDescription[status]} o candidato?`,
      () => updateStatus(candidate, status),
    );
  };

  const renderButtons = () => {
    return buttonsActions.map((button) => {
      if (candidate.status === button.status) return;
      return (
        <ButtonSmall
          key={button.status}
          bgcolor={button.color}
          onClick={() => confirmUpdate(candidate, button.status)}
        >
          {button.title}
        </ButtonSmall>
      );
    });
  };

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{candidate.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{candidate.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{candidate.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {renderButtons()}
          <HiOutlineTrash onClick={() => confirmRemove()} />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default CandidateCard;
