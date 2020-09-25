import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import React from 'react';
import { history, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';

import defaultSettings from '../config/defaultSettings';
import { pagePath } from './routes';
import userService from './services/user.service';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.UserDto;
  accessToken?: string;
  fetchUserInfo: () => Promise<API.UserDto | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await userService.getCurrentUser();
      return currentUser;
    } catch {
      history.push(pagePath.login);
    }
    return undefined;
  };
  // If it is a login page, do not execute
  if (history.location.pathname === pagePath.login)
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };

  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.UserDto; accessToken?: string };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // If not logged in, redirect to login
      if (!currentUser?.id && location.pathname !== pagePath.login) {
        history.push(pagePath.login);
      }
      localStorage.setItem('accessToken', initialState?.accessToken as string);
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

/**
 * Exception Handler
 */
const errorHandler = (error: ResponseError) => {
  const { response, data } = error;
  const apiError = data as API.ApiException;

  if (response && response.status) {
    const errorText = apiError.message || response.statusText;

    notification[response.status < 500 ? 'warning' : 'error']({
      message: apiError.error || 'Error',
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: "Something's wrong with your network and cannot connect to the server",
      message: 'Network Error',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
