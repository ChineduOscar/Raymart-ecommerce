import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [haveError, setHaveError] = useState(false);
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = FormData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      email,
      password,
    };

    dispatch(login(userData));
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
          <h3 className='title title-text'>Login to your Account</h3>
          <div>
            <div className='field'>
              <label htmlFor='email'>email</label>
              <input
                type='text'
                id='email'
                value={email}
                name='email'
                required
                placeholder='Enter Email'
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className='field'>
              <label htmlFor='password'>password</label>
              <input
                type='password'
                id='password'
                value={password}
                name='password'
                required
                placeholder='Enter Password'
                onChange={onChange}
              />
            </div>
          </div>
          <button className='button but'>login</button>
          <div className='new-user'>
            Don't have an account?
            <Link to='/register' className='to-register'>
              register
            </Link>
          </div>
        </div>
        {haveError && <div className='user-error'>Something went wrong</div>}
      </form>
    </section>
  );
};

export default Login;
