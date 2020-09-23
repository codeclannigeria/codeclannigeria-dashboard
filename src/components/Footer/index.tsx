import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Code Clan Niger`}
    links={[
      {
        key: 'CodeClan1',
        title: 'Code Clan Nigeria',
        href: 'https://www.codeclannigeria.dev',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/codeclannigeria/codeclannigeria-dashboard',
        blankTarget: true,
      },
      {
        key: 'CodeClan2',
        title: 'Code Clan Nigeria',
        href: 'https://www.codeclannigeria.dev',
        blankTarget: true,
      },
    ]}
  />
);
