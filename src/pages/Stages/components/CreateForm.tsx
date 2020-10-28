import { trackService } from '@/pages/Tracks/service';
import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';

interface CreateFormProps {
  loading: boolean;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (track: API.CreateStageDto) => Promise<void>;
}
const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: { span: 3 },
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, loading } = props;
  const [form] = Form.useForm();
  const [tracks, setTracks] = useState<API.TrackDto[]>([]);

  useEffect(() => {
    trackService.getTracks().then(({ items }) => setTracks(items));
  }, []);

  return (
    <Modal
      destroyOnClose
      title="Create New Stage"
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
              const stage = value as API.CreateStageDto;
              stage.level = +value.level;
              stage.taskCount = +value?.taskCount;
              await onSubmit(stage);
            });
          }}
        >
          Create
        </Button>
      }
    >
      <Form {...formLayout} form={form} initialValues={{ taskCount: 1 }}>
        <FormItem name="title" label="Title" rules={[{ required: true, max: 256 }]}>
          <Input placeholder="Title" />
        </FormItem>
        <FormItem
          name="taskCount"
          label="Task count"
          rules={[{ pattern: /^\d+$/, message: 'Task count must be a positive integer' }]}
        >
          <Input placeholder="How many tasks in this stage?" type="number" />
        </FormItem>
        <FormItem
          name="level"
          label="Level"
          rules={[
            { required: true },
            { pattern: /^\d+$/, message: 'Level must be a positive integer' },
          ]}
        >
          <Input placeholder="How many levels in this stage?" type="number" />
        </FormItem>
        <FormItem name="track" label="Track" rules={[{ required: true }]}>
          <Select style={{ width: '100%' }} placeholder="Select Track">
            {tracks?.map((track) => (
              <Option key={track.id} value={track.id}>
                {track.title}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="description" label="Desc" rules={[{ required: true, max: 1024 }]}>
          <TextArea placeholder="Describe the stage" rows={10} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
