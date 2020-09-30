import { Button, DatePicker, Form, Input, Modal, Select, Steps } from 'antd';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';

import SkillTags from './SkillTags';

export interface FormValueType extends Partial<API.UserDto> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<API.UserDto>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({ ...props.values });
  const [techs, setTechs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.technologies = techs.length > 0 ? techs : null;
    const dob = fieldsValue.dob && ((fieldsValue.dob as unknown) as Moment);
    fieldsValue.dob = dob && dob.toISOString();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="role" label="User role">
            <Select style={{ width: '100%' }} placeholder="-Select role-">
              <Option value="ADMIN">Admin</Option>
              <Option value="MENTOR">Mentor</Option>
              <Option value="MENTEE">Mentee</Option>
            </Select>
          </FormItem>
          <FormItem name="gender" label="Gender">
            <Select style={{ width: '100%' }} placeholder="-Select gender-">
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="UNSPECIFIED">Unspecified</Option>
            </Select>
          </FormItem>
          <FormItem name="country" label="Country">
            <Select style={{ width: '100%' }} placeholder="-Select country-">
              <Option value="Nigeria">Nigeria</Option>
              <Option value="Canada">Canada</Option>
              <Option value="USA">USA</Option>
            </Select>
          </FormItem>
          <FormItem name="city" label="City">
            <Select style={{ width: '100%' }} placeholder="-Select city-">
              <Option value="Lagos">Lagos</Option>
              <Option value="Ontario">Ontario</Option>
              <Option value="Texas">Texas</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem name="dob" label="Birthday" rules={[{ required: true }]}>
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="Date of Birth"
              showToday={false}
            />
          </FormItem>
          <FormItem name="phoneNumber" label="Phone number" rules={[{ required: true }]}>
            <Input placeholder="Phone number" />
          </FormItem>
          <FormItem name="technologies" label="Skills">
            <SkillTags technologies={values.technologies || []} onTechsSet={setTechs} />
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input placeholder="First name" />
        </FormItem>
        <FormItem name="lastName" label="Surname" rules={[{ required: true }]}>
          <Input placeholder="Last name" />
        </FormItem>
        <FormItem name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Email" />
        </FormItem>
        <FormItem
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              whitespace: true,
              max: 150,
            },
          ]}
        >
          <TextArea rows={4} placeholder="About user" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Submit
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>cancel</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Next
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      closable={false}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Update User Info"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Basic info" />
        <Step title="Access/Residence" />
        <Step title="Bio/Skills" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{ ...formVals, dob: formVals.dob && moment(formVals.dob) }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
