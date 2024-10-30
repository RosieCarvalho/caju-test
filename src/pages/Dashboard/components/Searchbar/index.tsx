import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as S from './styles';
import { useContext, useEffect } from 'react';
import { CandidatesContext } from '~/context/CandidatesContext';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF } from '~/utils/isValidCpf';
import { cpfMask } from '~/utils/cpfMask';
import { cpfNoMask } from '~/utils/cpfNoMask';

export const SearchBar = () => {
  const history = useHistory();

  const { filterCandidateByCpf, collumnsCandidates, listCandidates } =
    useContext(CandidatesContext);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const createUserFormSchema = z.object({
    cpf: z.string().refine((cpf: string) => {
      return isValidCPF(cpf);
    }, 'Digite um cpf válido'),
  });
  const {
    control,
    trigger,
    clearErrors,
    formState: { errors, isValid },
    getValues,
  } = useForm({ resolver: zodResolver(createUserFormSchema) });

  const findCandidates = (value: string) => {
    if (cpfNoMask(value)?.length === 11) {
      return trigger('cpf');
    }

    if (!value) {
      clearErrors('cpf');
      collumnsCandidates();
    }
  };

  useEffect(() => {
    filterCandidateByCpf(cpfNoMask(getValues('cpf')));
  }, [isValid]);
  return (
    <S.Container>
      <Controller
        name="cpf"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <TextField
              placeholder="Digite um cpf válido"
              label="CPF"
              onChange={(e) => {
                const { value } = e.target;
                e.target.value = cpfMask(value);
                onChange(e);
                findCandidates(value);
              }}
              error={errors.cpf ? errors.cpf.message : ''}
            />
          );
        }}
      ></Controller>

      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => listCandidates()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
