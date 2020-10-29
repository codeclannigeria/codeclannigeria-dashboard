import { trackService } from '@/pages/Tracks/service';
import { quillModules } from '@/utils/quill-opt';
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.StageDto>) => void;
  onSubmit: (values: Partial<API.StageDto>) => void;
  updateModalVisible: boolean;
  values: Partial<API.StageDto>;
}

export interface UpdateFormState {
  formVals: API.StageDto;
  currentStep: number;
}

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 3 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals] = useState<Partial<API.StageDto>>({
    ...props.values,
    track: props.values.track?.id as any,
  });
  const [form] = Form.useForm();
  const [tracks, setTracks] = useState<API.TrackDto[]>([]);

  useEffect(() => {
    trackService.getTracks().then(({ items }) => setTracks(items));
  }, []);

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
      title="Update Stage"
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
          <ReactQuill theme="snow" modules={quillModules} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
