import 'react-quill/dist/quill.snow.css';

import { trackService } from '@/pages/Tracks/service';
import { getEntities } from '@/services/base.service';
import { quillModules } from '@/utils/quill-opt';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface CreateFormProps {
  loading: boolean;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (track: API.CreateTaskDto) => Promise<void>;
}
const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: { span: 2 },
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, loading } = props;
  const [tracks, setTracks] = useState<API.TrackDto[]>([]);
  const [stages, setStages] = useState<API.StageDto[]>([]);
  const [courses, setCourses] = useState<API.CourseDto[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    trackService.getTracks().then(({ items }) => setTracks(items));
    getEntities<API.PagedList<API.StageDto>>('/api/stages').then(({ items }) => setStages(items));
    getEntities<API.PagedList<API.CourseDto>>('/api/courses').then(({ items }) =>
      setCourses(items),
    );
  }, []);
  return (
    <Modal
      destroyOnClose
      title="Create New Task"
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
              // Added this line to allow modification of argument.
              // eslint-disable-next-line no-param-reassign
              value.deadline = moment(value.deadline).toISOString();
              const task = value as API.CreateTaskDto;
              await onSubmit(task);
            });
          }}
        >
          Create
        </Button>
      }
    >
      {/* {props.children} */}
      <Form {...formLayout} form={form}>
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

export default CreateForm;
