import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import userService from '@/services/user.service';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

/**
 * Add node
 * @param fields
 */
const handleAdd = async (fields: API.CreateUserDto) => {
  const hide = message.loading('Adding');
  try {
    await userService.createUser({ ...fields });
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
    await userService.updateUser({ ...fields });
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
    await userService.deleteUsers({
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
      title: 'ID',
      dataIndex: 'id',
      search: false,
      hideInTable: true,
      hideInForm: true,
    },
    {
      dataIndex: 'photoUrl',
      valueType: 'avatar',
      hideInForm: true,
      hideInDescriptions: true,
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      // tip: 'click to see more',
      sorter: true,
      hideInDescriptions: true,
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
      hideInDescriptions: true,
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
      search: false,
      defaultSortOrder: 'ascend',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      sorter: true,
      defaultSortOrder: 'ascend',
      // tip: "When user's details was updated",
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInTable: true,
      search: false,
      formItemProps: {
        rules: [{ max: 250, whitespace: true }],
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      search: false,
      hideInTable: true,
      valueEnum: {
        0: { text: 'Male', role: 'MALE' },
        1: { text: 'Female', role: 'FEMALE' },
        2: { text: 'Unspecified', role: 'UNSPECIFIED' },
      },
    },
    {
      title: 'Birthday',
      dataIndex: 'dob',
      // tip: "When user's details was updated",
      valueType: 'dateTime',
      hideInTable: true,
      search: false,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      search: false,
      hideInTable: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      search: false,
      hideInTable: true,
    },

    {
      title: 'Skills',
      dataIndex: 'technologies',
      search: false,
      hideInTable: true,
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
          {/* <Divider type="vertical" />
          <a href="">Subscribe to alerts</a> */}
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
          <Button key="addButton" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> New
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          let skip = params.current || 0;
          skip = skip > 0 ? skip - 1 : skip;
          skip *= params.pageSize || 1;
          const result = await userService.getUsers({
            limit: params.pageSize,
            skip,
            search: { ...filter },
            opts: { sort: { ...sorter } },
          });
          const res = {
            data: result.items,
            total: result.totalCount,
            success: true,
            pageSize: params.pageSize,
            current: params.current,
          };
          return res;
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
          {/* <Button type="primary">Approve selected</Button> */}
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
            request={async () => ({ data: row || {} })}
            params={{ id: row?.id }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
