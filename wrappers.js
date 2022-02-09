(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"9kvl":function(e,n,t){"use strict";var r=t("FfOG");t.d(n,"a",(function(){return r["b"]}));t("bCY9")},afA6:function(e,n,t){"use strict";t.r(n);var r=t("0Owb"),o=t("q1tI"),a=t.n(o),i=t("q3YX"),s=t("9og8"),l=t("WmNS"),p=t.n(l),m=t("rlch"),c="import React from 'react';\nimport {Form} from 'antd'\nimport GenerateFormItem,{ FormFieldConfig } from '../../GenerateFormItem';\n\nconst formFields:Array<FormFieldConfig<{companyName:string}>> = [{\n  component: 'input',\n  name: 'companyName',\n}]\n\nexport default () =>{\n  const [form] = Form.useForm()\n  return <Form form={form}>\n    {GenerateFormItem(formFields)}\n  </Form>\n}",d="export * from './interface';\n\n\nimport GenerateFormItem from './GenerateFormItem'\n\nexport default GenerateFormItem",f="import React from \"react\";\nimport {Rule} from \"rc-field-form/lib/interface\";\nimport {FormItemProps} from \"antd/lib/form/FormItem\";\nimport {InputProps} from \"antd/lib/input\";\nimport {InputNumberProps} from \"antd/lib/input-number\";\nimport {SelectProps} from \"antd/lib/select\";\nimport {TransferItem, TransferProps} from \"antd/lib/transfer\";\nimport {DatePickerProps, RangePickerProps} from \"antd/lib/date-picker\";\n\nexport interface IBaseField<S> {\n  className?: string;\n  name?: string & keyof S;\n  label?: string | React.ReactNode;\n  rules?: Rule[];\n  formProps?: Partial<FormItemProps>;\n  show?: boolean;\n}\n// \u8f93\u5165\u6846\u5c5e\u6027\nexport interface IInputField<S> extends IBaseField<S> {\n  component: 'input';\n  props?: Omit<InputProps, 'name'>;\n}\n\n// \u6570\u5b57\u8f93\u5165\u6846\u5c5e\u6027\nexport interface IInputNumberField<S> extends IBaseField<S> {\n  component: 'inputNumber';\n  props?: Omit<InputNumberProps, 'name'>;\n}\n\n// \u4e0b\u62c9\u6846\u5c5e\u6027\nexport type ISelectOptions = {\n  key: string | number;\n  value?: string | number;\n  content: string | React.ReactNode;\n  disabled?: boolean;\n  label?: string | React.ReactNode;\n}[];\nexport interface ISelectField<S> extends IBaseField<S> {\n  component: 'select';\n  options: ISelectOptions;\n  hasAll?: boolean;\n  props?: Partial<SelectProps<any>>;\n}\n\n// transfer\nexport interface ITransferField<S> extends IBaseField<S> {\n  component: 'transfer';\n  options: TransferItem[];\n  props?: Omit<TransferProps<any>, 'targetKeys' | 'dataSource' | 'listStyle'>;\n}\n\n// datePicker\nexport interface IDateField<S> extends IBaseField<S> {\n  component: 'date';\n  props?: DatePickerProps;\n}\n\n// RangePicker\nexport interface IRangeField<S> extends IBaseField<S> {\n  component: 'range';\n  props?: RangePickerProps;\n}\n\n// \u81ea\u5b9a\u4e49\u8868\u5355\nexport interface ICustomField<S> extends IBaseField<S> {\n  component: 'custom';\n  render: React.ReactNode;\n}\n\nexport type FormFieldConfig<S> =\n  | IInputField<S>\n  | IInputNumberField<S>\n  | ISelectField<S>\n  | ICustomField<S>\n  | ITransferField<S>\n  | IDateField<S>\n  | IRangeField<S>",u="import React from 'react';\nimport { Form, Input, Select, Transfer, DatePicker, InputNumber } from 'antd';\nimport {FormFieldConfig} from './interface'\n\nconst { Option } = Select;\nconst { RangePicker } = DatePicker;\n\nfunction GenerateFormItem<Search>(\n  config: FormFieldConfig<Search>[]\n): React.ReactNode {\n    const renderField = (f: FormFieldConfig<Search>) => {\n        const label = f.label || ''\n        switch (f.component) {\n            case 'input':\n                return <Input placeholder={`\u8bf7\u8f93\u5165${label}`} {...f.props} />;\n            case 'inputNumber':\n                return <InputNumber {...f.props} />;\n            case 'select':\n                return (\n                  <Select placeholder={`\u8bf7\u9009\u62e9${label}`} {...f.props}>\n                      {f.hasAll && (\n                        <Option key=\"\" value=\"\">\n                            \u5168\u90e8\n                        </Option>\n                      )}\n                      {f.options.map((item) => (\n                        <Option\n                          key={item.key}\n                          title={typeof item?.content === 'string' ? item?.content : typeof item?.label === 'string' ?  item?.label : ''}\n                          value={item.value || item.key}\n                          disabled={item.disabled || false}\n                          label={item?.label} // \u65b0\u589e\uff0c\u7528\u4e8e\u56de\u586b\u5230\u9009\u62e9\u6846\u7684 Option \u4e0e\u4e0b\u62c9\u6570\u636e\u4e0d\u540c\u7684\u9700\u6c42\u3010\u6709optionLabelProp\u7684\u65f6\u5019\u3011\n                        >\n                            {item?.content || item?.label}\n                        </Option>\n                      ))}\n                  </Select>\n                );\n            case 'transfer':\n                return <Transfer dataSource={f.options} render={(item) => item.title || ''} {...f.props} />;\n            case 'date':\n                return <DatePicker placeholder={`\u8bf7\u9009\u62e9${label}`} {...f.props} />;\n            case 'range':\n                return <RangePicker {...f.props} />;\n            case 'custom':\n                return f.render;\n            default:\n                return <Input />;\n        }\n    };\n\n    return (\n      <>\n          {config.map((field, idx) => {\n              const { show = true } = field;\n              const style: any = show ? {} : { display: 'none' };\n              const formItem = (\n                <Form.Item\n                  className={field.className}\n                  style={style}\n                  key={`${idx}_${field.label}_${field.name}`}\n                  label={field.label}\n                  name={field.name}\n                  rules={show ? field.rules : []}\n                  valuePropName={field.component === 'transfer' ? 'targetKeys' : 'value'}\n                  {...field.formProps}\n                >\n                    {renderField(field)}\n                </Form.Item>\n              );\n              return formItem;\n          })}\n      </>\n    );\n}\n\nexport default GenerateFormItem",b="import React from 'react';\nimport {Alert} from '@cindydove/react_dx_ui';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793aaaa</Alert>;",F="import './index.less';",I="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  background: white;\n  border-radius: 3px;\n  color: white;\n}",g={"generateformitem-basic":{component:Object(m["c"])({loader:function(){var e=Object(s["a"])(p.a.mark((function e(){return p.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(1),t.e(13),t.e(4)]).then(t.bind(null,"uDVZ"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}(),loading:()=>null}),previewerProps:{sources:{_:{tsx:c},"index.ts":{import:"../../GenerateFormItem",content:d},"interface.ts":{import:"./interface",content:f},"GenerateFormItem.tsx":{import:"./GenerateFormItem",content:u}},dependencies:{react:{version:">=16.9.0"},antd:{version:"4.18.6",css:"antd/dist/antd.css"},"react-dom":{version:">=16.9.0"}},identifier:"generateformitem-basic"}},"alert-basic":{component:Object(m["c"])({loader:function(){var e=Object(s["a"])(p.a.mark((function e(){return p.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(1),t.e(13),t.e(4)]).then(t.bind(null,"025M"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}(),loading:()=>null}),previewerProps:{sources:{_:{tsx:b},"style/index.ts":{import:"../style",content:F},"style/index.less":{import:"./index.less",content:I}},dependencies:{react:{version:">=16.8.0"},"@cindydove/react_dx_ui":{version:"1.0.6"},"react-dom":{version:">=16.8.0"}},identifier:"alert-basic"}}},x=t("x2v5"),S=t("KcUY"),h=t.n(S);n["default"]=e=>a.a.createElement(h.a,Object(r["a"])({},e,{config:i,demos:g,apis:x}))},q3YX:function(e){e.exports=JSON.parse('{"menus":{"en-US":{"/getting-started":[{"path":"/getting-started","title":"\u5feb\u901f\u4e0a\u624b","meta":{}}],"/help":[{"path":"/help","title":"\u5e2e\u52a9","meta":{}}],"*":[{"path":"/","title":"DX UI","meta":{}}],"/components":[{"title":"\u7ec4\u4ef6\u603b\u89c8","meta":{"order":1,"__fallback":true},"children":[],"path":"/components"},{"path":"/components/alert","title":"Alert \u8b66\u544a\u63d0\u793a","meta":{}},{"path":"/components/generate-form-item","title":"GenerateFormItem","meta":{}}]}},"locales":[{"name":"en-US","label":"English"}],"navs":{"en-US":[{"title":"\u5feb\u901f\u4e0a\u624b","order":1,"path":"/getting-started"},{"path":"/components","title":"\u7ec4\u4ef6","order":2},{"title":"\u5e2e\u52a9","path":"/help"}]},"title":"cindydove UI","description":"\u63cf\u8ff0","mode":"site","repository":{"url":"https://github.com/cindydove/React_DX_UI","branch":"master"},"theme":{},"exportStatic":{}}')},x2v5:function(e){e.exports=JSON.parse("{}")}}]);