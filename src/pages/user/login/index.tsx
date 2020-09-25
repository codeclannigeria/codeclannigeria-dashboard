import logo from '@/assets/logo.svg';
import Footer from '@/components/Footer';
import { fakeAccountLogin, LoginParamsType } from '@/services/login';
import { Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { History, history, Link, SelectLang, useModel } from 'umi';

import LoginForm from './components/Login';
import styles from './style.less';

const { Email, Password, Submit } = LoginForm;

/**
 * This method will jump to the location of the redirect parameter
 */
const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // Log in
      const msg = await fakeAccountLogin({ ...values });
      if (msg.status === 'ok' && initialState) {
        message.success('Login successful!');
        const currentUser = await initialState?.fetchUserInfo();
        setInitialState({
          ...initialState,
          currentUser,
        });
        replaceGoto();
        return;
      }
    } catch (error) {
      message.error('Login failed, please try again');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Code Clan</span>
            </Link>
          </div>
          <div className={styles.desc}>Code Clan Nigeria</div>
        </div>

        <div className={styles.main}>
          <LoginForm onSubmit={handleSubmit}>
            <Email
              name="email"
              placeholder="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="Password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            />

            <div>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                remember me
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                forgot password
              </a>
            </div>
            <Submit loading={submitting}>log in</Submit>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
