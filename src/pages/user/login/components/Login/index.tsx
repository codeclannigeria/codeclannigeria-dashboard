import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import classNames from 'classnames';
import React from 'react';

import styles from './index.less';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';

export interface LoginProps {
  style?: React.CSSProperties;
  onSubmit?: (values: DTO.LoginReqDto) => void;
  className?: string;
  form?: FormInstance;
}

interface LoginType extends React.FC<LoginProps> {
  Submit: typeof LoginSubmit;
  Email: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = (props) => {
  const { className } = props;
  const [form] = Form.useForm();

  return (
    <div className={classNames(className, styles.login)}>
      <Form
        form={props.form || form}
        onFinish={(values) => {
          if (props.onSubmit) {
            props.onSubmit(values as DTO.LoginReqDto);
          }
        }}
      >
        {props.children}
      </Form>
    </div>
  );
};

Login.Email = LoginItem.Email;
Login.Password = LoginItem.Password;
Login.Submit = LoginSubmit;

export default Login;
