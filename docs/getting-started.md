---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## 安装

**使用 npm 安装**

```shell
npm install @cindydove/react_dx_ui -S
```


## 示例

```js
import Alert from '@cindydove/react_dx_ui/esm/alert'; // 手动按需加载 js
import '@cindydove/react_dx_ui/esm/alert/style'; // 手动按需加载 less

ReactDOM.render(<Alert kind="warning">这是一条警告提示</Alert>, mountNode);
```

### 自动按需加载

webpack和vite配置方式不同

#### webpack配置

使用 [babel-plugin-import ](https://www.npmjs.com/package/babel-plugin-import) 优化引入方式，如下：

```js
import { Alert } from '@cindydove/react_dx_ui'; // 与上述示例等价

ReactDOM.render(<Alert kind="warning">这是一条警告提示</Alert>, mountNode);
```

安装 `babel-plugin-import`

```
npm i babel-plugin-import -D
```

配置`.babelrc` 或 `babel-loader`

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@cindydove/react_dx_ui",
        "libraryDirectory": "esm", // default: lib
        "style": true // or 'css'
      }
    ]
  ]
}
```

#### vite配置

vite下配置`babel-plugin-import`不生效

使用 [vite-plugin-importer ](https://www.npmjs.com/package/vite-plugin-importer) 优化引入方式，如下：

```js
import { Alert } from '@cindydove/react_dx_ui'; // 与上述示例等价

ReactDOM.render(<Alert kind="warning">这是一条警告提示</Alert>, mountNode);
```

安装 `vite-plugin-importer`

```
npm i vite-plugin-importer -D
```

配置`vite.config.js` 

```ts
import { defineConfig } from "vite";
import usePluginImport from 'vite-plugin-importer'
export default defineConfig({
  plugins: [
    ... // other plugins
     usePluginImport({
              libraryName: '@cindydove/react_dx_ui',
              libraryDirectory: 'esm',
              style: 'css',
            }),
    // Other configurations welcome PR
  ]
})

```