import TextField from '~/components/TextField';
import * as S from './styles';
import Button from '~/components/Buttons';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/Buttons/IconButton';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import routes from '~/router/routes';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF } from '~/utils/isValidCpf';
import { isValidateNameComplet } from '~/utils/isValidNameComplet';
import { cpfMask } from '~/utils/cpfMask';
import { createCandidate } from '~/api/createCandidate';
import { useContext } from 'react';
import { CandidatesContext } from '~/context/CandidatesContext';
import { NewCandidateType } from './types';
import toast from 'react-hot-toast';
import { cpfNoMask } from '~/utils/cpfNoMask';

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };
  const { listCandidates } = useContext(CandidatesContext);
  const createUserFormSchema = z.object({
    employeeName: z.string().refine((name: string) => {
      return isValidateNameComplet(name);
    }, 'É necessário seu nome e sobrenome. ex: thiago viegas'),
    cpf: z.string().refine((cpf: string) => {
      return isValidCPF(cpf);
    }, 'Digite um cpf válido'),
    email: z.string().email('Digite um email válido'),
    admissionDate: z.date(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      admissionDate: new Date(),
      cpf: '',
      email: '',
      employeeName: '',
    },

    resolver: zodResolver(createUserFormSchema),
  });

  const handleNewUser = async (data: NewCandidateType) => {
    await createCandidate({ ...data, cpf: cpfNoMask(data.cpf) })
      .then(() => {
        toast.success('Candidato salvo com sucesso!');
        listCandidates();
        history.push(routes.dashboard);
      })
      .catch(() => toast.error('Ocorreu um erro ao salvar candidato'));
  };

  return (
    <form onSubmit={handleSubmit(handleNewUser)}>
      <S.Container>
        <S.Card>
          <IconButton onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField
            placeholder="Nome"
            label="Nome"
            error={
              errors.employeeName && <span>{errors.employeeName.message}</span>
            }
            {...register('employeeName')}
          />
          <TextField
            placeholder="Email"
            label="Email"
            error={errors.email && <span>{errors.email.message}</span>}
            {...register('email')}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <TextField
                  placeholder="CPF"
                  label="CPF"
                  onChange={(e) => {
                    const { value } = e.target;
                    e.target.value = cpfMask(value);
                    onChange(e);
                  }}
                  error={errors.cpf && <span>{errors.cpf.message}</span>}
                />
              );
            }}
          ></Controller>

          <TextField
            placeholder="Data"
            type="date"
            label="Data Admissão"
            {...register('admissionDate', { valueAsDate: true })}
          />

          {!isSubmitting ? (
            <Button type="submit">Cadastrar</Button>
          ) : (
            <div style={{ alignSelf: 'flex-end' }}>
              <ReactLoading
                color="#64a98c"
                type="spin"
                height={17}
                width={45}
              />
            </div>
          )}
        </S.Card>
      </S.Container>
    </form>
  );
};

export default NewUserPage;
