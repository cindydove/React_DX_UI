import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Button } from 'antd';
import GenerateFormItem,{  FormFieldConfig } from '../GenerateFormItem';
import { FormProps } from 'antd/es/form';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { TableProps } from 'antd/es/table';
import { headerBtnProps } from './interface'

export interface FormTableProps<F = any, T extends object = any> {
    layout?: 'horizontal' | 'inline' | 'vertical';
    form?: FormInstance<F>; // form实例
    formProps?: FormProps;
    formFields?: FormFieldConfig<F>[]; // form配置
    tableProps: TableProps<T>; // table属性
    // useAntdTable返回
    search: {
        submit: () => void;
        reset: () => void;
    };
    headerBtn?: headerBtnProps[]; // 顶部操作项
    addBtn?: ReactNode; // 自定义按钮
    customComponent?: any;
    tableColumns?: any;
    showBtnFields?: boolean;
    showResetBtn?: boolean;
    searchBtnType?: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed' | undefined;
}

export default function FormTablePage<F = any, T extends object = any>(props: FormTableProps<F, T>) {
    const {
        layout = 'inline',
        form,
        formFields,
        tableProps,
        search,
        headerBtn,
        addBtn,
        customComponent,
        formProps,
        showBtnFields = true,
        showResetBtn = true,
        searchBtnType = 'default',
        tableColumns,
    } = props;
    const { submit, reset } = search;
    const btnFields: Array<FormFieldConfig<never>> = useMemo(
      () => [
          {
              component: 'custom',
              render: () => (
                <>
                    <Button onClick={submit} style={{ marginRight: 16 }} type={searchBtnType}>
                        搜索
                    </Button>
                    {addBtn || ''}
                    {showResetBtn && (
                      <Button type="link" onClick={reset} style={{ marginLeft: 16 }}>
                          重置筛选项
                      </Button>
                    )}
                </>
              ),
              formProps: {
                  style: { display: 'flex', justifyContent: 'flex-end', width: 'unset' },
                  dependencies: [], // 在Form.Item中render props类型的children必须有dependencies或shouldUpdate属性
              },
          },
      ],
      [addBtn, reset, submit, searchBtnType],
    );
    const formItemFormFields = useMemo(
      () => formFields && GenerateFormItem(formFields),
      [formFields],
    );
    const formItemBtnFields = useMemo(
      () => showBtnFields && btnFields && GenerateFormItem(btnFields),
      [btnFields, showBtnFields],
    );
    return (
      <>
          {headerBtn && (
            <div className="page-header">
                {headerBtn.map((btn) => (
                  <Button className="btn-light" onClick={btn.event || (() => {})} key={btn.name}>
                      {btn.event ? btn.name : <Link to={btn.path || ''}>{btn.name}</Link>}
                  </Button>
                ))}
            </div>
          )}
          {formFields && (
            <div className="form-fields">
                <Form form={form} layout={layout} {...formProps}>
                    {formItemFormFields}
                    {formItemBtnFields}
                </Form>
            </div>
          )}
          {customComponent}
          <div style={{ position: 'relative' }}>
              <Table
                {...tableProps}
                pagination={
                    tableProps?.pagination
                      ? { position: ['bottomCenter'], ...tableProps?.pagination }
                      : false
                }
              />
              {/* 用户自定义展示列表头 */}
              {tableColumns || null}
          </div>
      </>
    );
}

