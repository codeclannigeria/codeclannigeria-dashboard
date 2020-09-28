import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { addRule, queryRule, removeRule, updateRule } from './service';
import { TableListItem } from './tbl.schema';

/**
 * Add node
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
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
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
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
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
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
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'avatar',
      valueType: 'avatar',
      hideInForm: true,
    },
    {
      title: 'Rule name',
      dataIndex: 'name',
      tip: 'Rule name is the unique key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Rule name is required',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'Service calls no.',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} ten thousand`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      sorter: true,
      valueEnum: {
        0: { text: 'Offline', status: 'Default' },
        1: { text: 'Running', status: 'Processing' },
        2: { text: 'Online', status: 'Success' },
        3: { text: 'Abnormal', status: 'Error' },
      },
    },
    {
      title: 'Last schedule time',
      dataIndex: 'updatedAt',
      sorter: true,
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
      <ProTable<TableListItem>
        headerTitle="Enquiry Form"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> New
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
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
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} ten thousand
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
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
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
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
