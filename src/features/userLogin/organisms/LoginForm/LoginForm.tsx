import React, { useState } from 'react';
import InputField from '../../../userLogin/molecules/InputField/InputField';
import Button from '../../atoms/Button/Button';
import FormFooter from '../../../userLogin/molecules/FormFooter/FormFooter';
import { useLogin } from '../../../../hooks/useLogin';
import { validateEmail, validatePassword } from '../../../../utils/validators';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, loading, error: loginError } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (email === '') {
      newErrors.email = 'Enter Email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!validatePassword(password)) newErrors.password = 'Password too short';
    if (!password) newErrors.password = 'Enter Password';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(email, password);
        navigate('./home');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      <Button
        type="submit"
        label={loading ? 'Logging in...' : 'Login'}
        disabled={loading}
      />
      <FormFooter />
    </form>
  );
};

export default LoginForm;
