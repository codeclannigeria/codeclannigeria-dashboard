import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

interface CreateFormProps {
  loading: boolean;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (track: API.CreateCourseDto) => Promise<void>;
}
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 2 },
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, loading } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      destroyOnClose
      title="Create New Course"
      visible={modalVisible}
      bodyStyle={{ padding: '32px 40px 48px' }}
      width="65%"
      onCancel={() => onCancel()}
      footer={
        <Button
          type="primary"
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            form.validateFields().then(async (value) => {
              const course = value as API.CreateCourseDto;
              await onSubmit(course);
            });
          }}
        >
          Create
        </Button>
      }
    >
      <Form {...formLayout} form={form}>
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

export default CreateForm;
