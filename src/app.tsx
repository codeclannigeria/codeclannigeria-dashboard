import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
import { pagePath } from './routes';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: DTO.UserDto;
  accessToken?: string;
  fetchUserInfo: () => Promise<DTO.UserDto | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
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
  initialState: { settings?: LayoutSettings; currentUser?: DTO.UserDto; accessToken?: string };
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

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'New or modified data is successful. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'The data was deleted successfully. ',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (the token, username or password is wrong). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request sent was for a record that did not exist, and the server did not operate. ',
  405: 'The requested method is not allowed. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource is permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',
  502: 'Gateway error ',
  503: 'The service is unavailable, and the server is temporarily overloaded or maintained. ',
  504: 'The gateway timed out. ',
};

/**
 * Exception Handler
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request Error ${status}: ${url}`,
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
