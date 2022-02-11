"use strict"
// Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。
// 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。

import path from 'path'
const __dirname = path.resolve(path.dirname(''))

const plop =  function (plop) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称' },
    ],
    actions: [
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/index.ts'),
        templateFile: path.resolve(__dirname, './templates/component/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/{{pascalCase name}}.tsx'),
        templateFile: path.resolve(__dirname, './templates/component/comp.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/style/index.less'),
        templateFile: path.resolve(__dirname, './templates/component/style/style.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/style/index.ts'),
        templateFile: path.resolve(__dirname, './templates/component/style/index.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './docs/components/{{pascalCase name}}.md'),
        templateFile: path.resolve(__dirname, './templates/component/doc.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/interface.ts'),
        templateFile: path.resolve(__dirname, './templates/component/interface.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/demo/basic.tsx'),
        templateFile: path.resolve(__dirname, './templates/component/demo/basic.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, './src/{{pascalCase name}}/__tests__/index.test.tsx'),
        templateFile: path.resolve(__dirname, './templates/component/__tests__/index.test.hbs'),
      },
      {
        type: 'append',
        path: path.resolve(__dirname, './src/index.ts'),
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';",
      },
    ],
  });
}

export default  plop


