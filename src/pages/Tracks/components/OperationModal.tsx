import { Button, Form, Input, Modal, Result } from 'antd';
import moment from 'moment';
import React, { FC, useEffect } from 'react';

import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<API.TrackDto> | undefined;
  onDone: () => void;
  onSubmit: (values: API.TrackDto) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as API.TrackDto);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: 'Save', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="Successful"
          subTitle="You've successfully created a Track. Users can now enroll to this track"
          extra={
            <Button type="primary" onClick={onDone}>
              Okay
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form form={form} {...formLayout} onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Please enter" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, min: 5, max: 1024 }]}
        >
          <TextArea rows={4} placeholder="About this Track" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `Track ${current ? 'edit' : 'Add'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
