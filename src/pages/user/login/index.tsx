import logo from '@/assets/logo.svg';
import Footer from '@/components/Footer';
import { fakeAccountLogin, LoginParamsType } from '@/services/login';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { history, History, Link, SelectLang, useModel } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

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
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // Log in
      const msg = await fakeAccountLogin({ ...values, type });
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
      // If it fails to set the user error message
      setUserLoginState(msg);
    } catch (error) {
      message.error('Login failed, please try again');
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

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
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" tab="Password login">
              {status === 'error' && loginType === 'account' && !submitting && (
                <LoginMessage content="Incorrect Username or Password" />
              )}

              <Username
                name="username"
                placeholder="Username: admin or user"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your username!',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="Password: ant.design"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
              />
            </Tab>
            <Tab key="mobile" tab="Mobile number login">
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <LoginMessage content="Verification Code" />
              )}
              <Mobile
                name="mobile"
                placeholder="phone number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone number',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: 'Invalid phone number',
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder="Verification code"
                countDown={120}
                getCaptchaButtonText=""
                getCaptchaSecondText="Seconds"
                rules={[
                  {
                    required: true,
                    message: 'please enter verification code!',
                  },
                ]}
              />
            </Tab>
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
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
