import 'react-quill/dist/quill.snow.css';

import { trackService } from '@/pages/Tracks/service';
import { getEntities } from '@/services/base.service';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { quillModules } from '@/utils/quill-opt';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.TaskDto>) => void;
  onSubmit: (values: Partial<API.TaskDto>) => void;
  updateModalVisible: boolean;
  values: Partial<API.TaskDto>;
}
const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormState {
  formVals: API.TaskDto;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 2 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals] = useState<Partial<API.TaskDto>>({
    ...props.values,
    deadline: moment(props.values.deadline) as any,
  });
  const [tracks, setTracks] = useState<API.TrackDto[]>([]);
  const [stages, setStages] = useState<API.StageDto[]>([]);
  const [courses, setCourses] = useState<API.CourseDto[]>([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  useEffect(() => {
    trackService.getTracks().then(({ items }) => setTracks(items));
    getEntities<API.PagedList<API.StageDto>>('/api/stages').then(({ items }) => setStages(items));
    getEntities<API.PagedList<API.CourseDto>>('/api/courses').then(({ items }) =>
      setCourses(items),
    );
  }, []);

  const handleSave = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      width="65%"
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Update Task"
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

        <FormItem name="track" label="Track" rules={[{ required: true }]}>
          <Select style={{ width: '100%' }} placeholder="Select Track">
            {tracks?.map((track) => (
              <Option key={track.id} value={track.id}>
                {track.title}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="stage" label="Stage" rules={[{ required: true }]}>
          <Select style={{ width: '100%' }} placeholder="Select Stage">
            {stages?.map((stage) => (
              <Option key={stage.id} value={stage.id}>
                {stage.title}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="course" label="Course" rules={[{ required: true }]}>
          <Select style={{ width: '100%' }} placeholder="Select Course">
            {courses?.map((course) => (
              <Option key={course.id} value={course.id}>
                {course.title}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="deadline" label="Deadline">
          <DatePicker placeholder="Deadline" style={{ width: '100%' }} showTime />
        </FormItem>
        <FormItem name="description" label="Desc" rules={[{ required: true }]}>
          <ReactQuill theme="snow" modules={quillModules} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
