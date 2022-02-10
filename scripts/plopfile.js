/* eslint-disable  import/no-extraneous-dependencies */
const path = require("path")
console.log("dx---__dirname",__dirname)
const plop =  function (plop) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称' },
    ],
    actions: [
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/{{pascalCase name}}.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/comp.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/style/index.less'),
        templateFile: path.resolve(__dirname, '../templates/component/style/style.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/style/index.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/style/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../docs/components/{{pascalCase name}}.md'),
        templateFile: path.resolve(__dirname, '../templates/component/doc.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/interface.ts'),
        templateFile: path.resolve(__dirname, '../templates/component/interface.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/demo/basic.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/demo/basic.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../src/{{pascalCase name}}/__tests__/index.test.tsx'),
        templateFile: path.resolve(__dirname, '../templates/component/__tests__/index.test.hbs'),
      },
      {
        type: 'append',
        path: path.resolve(__dirname, '../src/index.ts'),
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';",
      },
    ],
  });
}

module.exports = plop
