import React from "react";
import {Rule} from "rc-field-form/lib/interface";
import {FormItemProps} from "antd/lib/form/FormItem";
import {InputProps} from "antd/lib/input";
import {InputNumberProps} from "antd/lib/input-number";
import {SelectProps} from "antd/lib/select";
import {TransferItem, TransferProps} from "antd/lib/transfer";
import {DatePickerProps, RangePickerProps} from "antd/lib/date-picker";

export interface IBaseField<S> {
  className?: string;
  name?: string & keyof S;
  label?: string | React.ReactNode;
  rules?: Rule[];
  formProps?: Partial<FormItemProps>;
  show?: boolean;
}
// 输入框属性
export interface IInputField<S> extends IBaseField<S> {
  component: 'input';
  props?: Omit<InputProps, 'name'>;
}

// 数字输入框属性
export interface IInputNumberField<S> extends IBaseField<S> {
  component: 'inputNumber';
  props?: Omit<InputNumberProps, 'name'>;
}

// 下拉框属性
export type ISelectOptions = {
  key: string | number;
  value?: string | number;
  content: string | React.ReactNode;
  disabled?: boolean;
  label?: string | React.ReactNode;
}[];
export interface ISelectField<S> extends IBaseField<S> {
  component: 'select';
  options: ISelectOptions;
  hasAll?: boolean;
  props?: Partial<SelectProps<any>>;
}

// transfer
export interface ITransferField<S> extends IBaseField<S> {
  component: 'transfer';
  options: TransferItem[];
  props?: Omit<TransferProps<any>, 'targetKeys' | 'dataSource' | 'listStyle'>;
}

// datePicker
export interface IDateField<S> extends IBaseField<S> {
  component: 'date';
  props?: DatePickerProps;
}

// RangePicker
export interface IRangeField<S> extends IBaseField<S> {
  component: 'range';
  props?: RangePickerProps;
}

// 自定义表单
export interface ICustomField<S> extends IBaseField<S> {
  component: 'custom';
  render: React.ReactNode;
}

export type FormFieldConfig<S> =
  | IInputField<S>
  | IInputNumberField<S>
  | ISelectField<S>
  | ICustomField<S>
  | ITransferField<S>
  | IDateField<S>
  | IRangeField<S>