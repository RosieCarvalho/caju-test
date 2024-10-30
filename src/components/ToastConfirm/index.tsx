import toast from 'react-hot-toast';
import * as S from './styles';

import { ButtonSmall } from '~/components/Buttons';

const ToastConfirm = (description: string, actionConfirm: () => void) => {
  toast((t) => (
    <S.CustonToast>
      {description}
      <S.ButtonToast>
        <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          onClick={() => {
            actionConfirm();
            toast.dismiss(t.id);
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

export default ToastConfirm;
