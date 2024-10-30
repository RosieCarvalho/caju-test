import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id}>{label}</label>
        <Input {...props} ref={ref} />
        <p style={{ fontSize: 12, color: 'red', margin: 0 }}>{error}</p>
      </div>
    );
  },
);

TextField.displayName = 'Input';

export { TextField };

export default TextField;
