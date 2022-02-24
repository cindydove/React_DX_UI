import React from 'react';
import { Form, Input, Select, Transfer, DatePicker, InputNumber } from 'antd';
import { FormFieldConfig } from './interface';

const { Option } = Select;
const { RangePicker } = DatePicker;

function GenerateFormItem<Search>(config: FormFieldConfig<Search>[]): React.ReactNode {
  const renderField = (f: FormFieldConfig<Search>) => {
    const label = f.label || '';
    switch (f.component) {
      case 'input':
        return <Input placeholder={`请输入${label}`} {...f.props} />;
      case 'inputNumber':
        return <InputNumber {...f.props} />;
      case 'select':
        return (
          <Select placeholder={`请选择${label}`} {...f.props}>
            {f.hasAll && (
              <Option key="" value="">
                全部
              </Option>
            )}
            {f.options.map((item) => (
              <Option
                key={item?.key || item?.value}
                title={
                  typeof item?.title === 'string'
                    ? item?.title
                    : typeof item?.label === 'string'
                    ? item?.label
                    : ''
                }
                value={item.key || item.value}
                disabled={item?.disabled || false}
                label={item?.label} // 新增，用于回填到选择框的 Option 与下拉数据不同的需求【有optionLabelProp的时候】
              >
                {item?.title || item?.label}
              </Option>
            ))}
          </Select>
        );
      case 'transfer':
        return <Transfer dataSource={f.options} render={(item) => item.title || ''} {...f.props} />;
      case 'date':
        return <DatePicker placeholder={`请选择${label}`} {...f.props} />;
      case 'range':
        return <RangePicker {...f.props} />;
      case 'custom':
        return f.render;
      default:
        return <Input />;
    }
  };

  return (
    <>
      {config.map((field, idx) => {
        const { show = true } = field;
        const style: any = show ? {} : { display: 'none' };
        const formItem = (
          <Form.Item
            className={field.className}
            style={style}
            key={`${idx}_${field.label}_${field.name}`}
            label={field.label}
            name={field.name}
            rules={show ? field.rules : []}
            valuePropName={field.component === 'transfer' ? 'targetKeys' : 'value'}
            {...field.formProps}
          >
            {renderField(field)}
          </Form.Item>
        );
        return formItem;
      })}
    </>
  );
}

export default GenerateFormItem;
