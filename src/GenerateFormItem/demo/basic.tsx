import React from 'react';
import {Form} from 'antd'
import GenerateFormItem,{ FormFieldConfig } from '../../GenerateFormItem';

const formFields:Array<FormFieldConfig<{companyName:string}>> = [{
  component: 'input',
  name: 'companyName',
}]

export default () =>{
  const [form] = Form.useForm()
  return <Form form={form}>
    {GenerateFormItem(formFields)}
  </Form>
}
