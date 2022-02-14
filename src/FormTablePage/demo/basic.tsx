import React, { useMemo } from 'react';
import { FormTablePage } from '@cindydove/react_dx_ui';
import { Form, Input } from 'antd';
import { FormFieldConfig } from '@cindydove/react_dx_ui/esm/GenerateFormItem';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';

interface FormItem {
  name: string;
  phone: number;
  sex: string;
  des?: string;
}

export default () => {
  const [form] = Form.useForm();

  const { tableProps, search } = useAntdTable(
    ({ current, pageSize }: PaginatedParams[0], formData: FormItem) => {
      return new Promise<{ list: Array<FormItem>; total: number }>((resolve) => {
        const timer = setTimeout(() => {
          resolve({ list: [{ name: 'dx', phone: 18334792306, sex: '女' }], total: 1 });
          clearTimeout(timer);
        }, 2000);
      });
    },
    {
      defaultPageSize: 10,
      form,
    },
  );
  console.log('dx----tableProps, search', tableProps, search);
  const formFields: Array<FormFieldConfig<FormItem>> = useMemo(
    () => [
      {
        component: 'input',
        name: 'name',
        label: '名称',
      },
      {
        component: 'input',
        name: 'phone',
        label: '手机号',
      },
      {
        component: 'select',
        name: 'sex',
        label: '性别',
        props: {
          width: 200,
        },
        options: [
          { label: '男', value: 0 },
          { label: '女', value: 1 },
        ],
      },
      {
        component: 'custom',
        name: 'des',
        label: '描述',
        render: (
          <Input.TextArea
            style={{ width: 200 }}
            placeholder="请输入描述"
            autoSize={{ minRows: 1, maxRows: 1 }}
          ></Input.TextArea>
        ),
      },
    ],
    [],
  );
  const columns = useMemo(() => {
    return [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
    ];
  }, []);

  return (
    <FormTablePage
      form={form}
      formFields={formFields}
      search={search}
      tableProps={{
        ...tableProps,
        rowKey: 'phone',
        columns,
        bordered: true,
      }}
    />
  );
};
