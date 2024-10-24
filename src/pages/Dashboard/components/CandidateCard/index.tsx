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
import toast from 'react-hot-toast';
import { CandidateType, StatusType } from '~/pages/Dashboard/types';

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

const CandidateCard = ({ candidate }: CandidateProps) => {
  const { removeCandidate, updateStatus } = useContext(CandidatesContext);

  const confirmRemove = () => {
    toast((t) => (
      <S.CustonToast>
        Tem certeza que deseja <b>deletar</b> o candidato?
        <S.ButtonToast>
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => {
              toast.dismiss(t.id);
              removeCandidate(candidate.id);
            }}
          >
            Confirmar
          </ButtonSmall>
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </ButtonSmall>
        </S.ButtonToast>
      </S.CustonToast>
    ));
  };

  const confirmUpdate = (candidate: CandidateType, status: StatusType) => {
    toast((t) => (
      <S.CustonToast>
        Tem certeza que deseja <b>{status}</b> o candidato?
        <S.ButtonToast>
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => {
              toast.dismiss(t.id);
              updateStatus(candidate, status);
            }}
          >
            Confirmar
          </ButtonSmall>
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </ButtonSmall>
        </S.ButtonToast>
      </S.CustonToast>
    ));
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
