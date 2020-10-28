import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.CourseDto>) => void;
  onSubmit: (values: Partial<API.CourseDto>) => void;
  updateModalVisible: boolean;
  values: Partial<API.CourseDto>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: API.CourseDto;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 2 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals] = useState<Partial<API.CourseDto>>(props.values);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSave = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      width="65%"
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Update Course"
      confirmLoading
      visible={updateModalVisible}
      footer={
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancel</Button>
          <Button type="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </>
      }
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form {...formLayout} form={form} initialValues={formVals}>
        <FormItem name="title" label="Title" rules={[{ required: true, max: 64 }]}>
          <Input placeholder="Title" />
        </FormItem>

        <FormItem name="playlistUrl" label="Playlist" rules={[{ required: true, type: 'url' }]}>
          <Input placeholder="Playlist URL" />
        </FormItem>

        <FormItem name="description" label="Desc" rules={[{ required: true }]}>
          <TextArea placeholder="Describe the course" rows={10} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
