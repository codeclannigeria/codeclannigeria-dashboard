import { LockTwoTone, MailOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  Email: {
    props: {
      size: 'large',
      placeholder: 'Enter your email',
      prefix: (
        <MailOutlined
          style={{
            color: '#1890ff',
          }}
          className={styles.prefixIcon}
        />
      ),
    },
    rules: [
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Invalid email!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
      placeholder: 'Enter your password',
      type: 'password',
    },
    rules: [
      {
        required: true,
        message: 'Password is required!',
      },
    ],
  },
};
