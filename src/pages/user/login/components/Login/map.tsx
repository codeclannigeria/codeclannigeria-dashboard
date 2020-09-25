import { LockTwoTone, MailOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  Email: {
    props: {
      size: 'large',
      id: 'email',
      name: 'email',
      prefix: (
        <MailOutlined
          style={{
            color: '#1890ff',
          }}
          className={styles.prefixIcon}
        />
      ),
      placeholder: 'Enter your email',
    },
    rules: [
      {
        required: true,
        message: 'Please enter email!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: 'Enter your password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      },
    ],
  },
};
