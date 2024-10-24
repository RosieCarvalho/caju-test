import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as S from './styles';
import { cpfMask } from '~/utils/cpfMask';
import { useContext, useState } from 'react';
import { CandidatesContext } from '~/context/CandidatesContext';
import { isValidCPF } from '~/utils/isValidCpf';
export const SearchBar = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState('');
  const [errorInput, setErrorInput] = useState('');

  const { filterCandidateByCpf, collumnsCandidates, listCandidates } =
    useContext(CandidatesContext);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  const handlechange = (e) => {
    setCpf(e.target.value);

    const cpfNoMack = e.target.value.replace(/\.|-/gm, '');
    //melhorar a lógica de validação de cpf
    if (cpfNoMack.length === 11) {
      if (isValidCPF(cpfNoMack)) {
        filterCandidateByCpf(cpfNoMack);
        setErrorInput('');
        return;
      }
      setErrorInput('CPF inválido');
    }
    collumnsCandidates();
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={handlechange}
        value={cpfMask(cpf)}
        error={errorInput}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => listCandidates()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
