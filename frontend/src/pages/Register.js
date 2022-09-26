import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import Loading from '../components/Loading';

const Register = () => {
  const [haveError, setHaveError] = useState(false);
  const [FormData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = FormData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setHaveError(true);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(register(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='user-container'>
      <form className='user-field' onSubmit={onSubmit}>
        <div className='all-input-fields'>
          <h3 className='title title-text'>Create your Account</h3>
          <div>
            <div className='field'>
              <label htmlFor='first-name'>first name</label>
              <input
                type='text'
                id='first-name'
                name='firstName'
                value={firstName}
                required
                placeholder='Enter First Name'
                onChange={onChange}
              />
            </div>
            <div className='field'>
              <label htmlFor='last-name'>last name</label>
              <input
                type='text'
                id='last-name'
                placeholder='Enter Last Name'
                name='lastName'
                value={lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className='field'>
              <label htmlFor='email'>email</label>
              <input
                type='text'
                id='email'
                name='email'
                value={email}
                required
                placeholder='Enter Email'
                onChange={onChange}
              />
            </div>
            <div className='field'>
              <label htmlFor='password'>password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                required
                placeholder='Enter Password'
                onChange={onChange}
              />
            </div>
          </div>
          <button className='button'>register</button>
        </div>
        {haveError && <div className='user-error'>Something went wrong</div>}
      </form>
    </section>
  );
};

export default Register;
