import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import React from 'react';
import ItemMap from './map';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  Email: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: LoginItemProps) => {
  const options: {
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
    initialValue?: LoginItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = (props) => {
  // This is written to prevent onChange, defaultValue, rules props from being brought into restProps tabUtil
  const { onChange, customProps, defaultValue, rules, name, ...restProps } = props;

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...restProps} />
    </FormItem>
  );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
    <LoginItem customProps={item.props} rules={item.rules} {...props} {...item.props} />
  );
});

export default LoginItems as LoginItemType;
