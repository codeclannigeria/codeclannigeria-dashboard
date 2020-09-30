import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { addRule, queryRule, removeRule, updateUser } from './service';

/**
 * Add node
 * @param fields
 */
const handleAdd = async (fields: API.CreateUserDto) => {
  const hide = message.loading('Adding');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed! Please try again');
    return false;
  }
};

/**
 * Update node
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Updating...');
  try {
    await updateUser({ ...fields });
    hide();

    message.success('Updated successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserDto[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserDto>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserDto[]>([]);
  const columns: ProColumns<API.UserDto>[] = [
    {
      dataIndex: 'photoUrl',
      valueType: 'avatar',
      hideInForm: true,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      sorter: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'First name is required',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Surname',
      dataIndex: 'lastName',
      sorter: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Last name is required',
          },
        ],
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      formItemProps: {
        rules: [
          {
            type: 'email',
            message: 'Invalid email',
          },
          {
            required: true,
            message: 'Email is required',
          },
        ],
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        rules: [{ max: 250, whitespace: true }],
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      formItemProps: {
        rules: [
          { type: 'regexp', message: 'Phone number is invalid, e.g +2347078455687' },
          {
            required: true,
            message: 'Phone number is required',
          },
        ],
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
      valueEnum: {
        0: { text: 'Admin', role: 'ADMIN' },
        1: { text: 'Mentor', role: 'MENTOR' },
        2: { text: 'Mentee', role: 'MENTEE' },
      },
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      sorter: true,
      defaultSortOrder: 'ascend',
      // tip: "When user's details was updated",
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="Please enter the reason for the exception!" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <a href="">Subscribe to alerts</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.UserDto>
        headerTitle="Users Form"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> New
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const result = await queryRule({
            limit: params.pageSize,
            skip: params.current && params.current - 1,
            search: { ...filter },
            opts: { sort: { ...sorter } },
          });
          return {
            data: result.items,
            total: result.totalCount,
            success: true,
            pageSize: params.pageSize,
            current: params.current,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              chosen <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> items&nbsp;&nbsp;
              <span>
                Total number of service calls{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.tracks.length, 0)} ten thousand
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Delete selected
          </Button>
          <Button type="primary">Approve selected</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<API.UserDto, API.UserDto>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
      >
        {row?.id && (
          <ProDescriptions<API.UserDto>
            column={2}
            title={`${row.firstName} ${row.lastName}`}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
