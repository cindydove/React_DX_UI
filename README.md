## React 组件库搭建指南

参考资料推荐： [https://github.com/worldzhao/blog/issues](https://github.com/worldzhao/blog/issues)

[🚀 在线预览](https://cindydove.github.io/React_DX_UI)

 本地预览

```bash
git clone git@github.com:cindydove/React_DX_UI.git
cd React_DX_UI
npm run start
```

按顺序执行完命令后，即可在 localhost:3000 端口看到以下内容：

![preview](https://raw.githubusercontent.com/worldzhao/blog/master/images/rc-lib-v1-1.jpg)


### 开发教程

##package.json文件标注

```json

{
  "name": "@cindydove/react_dx_ui",
  "version": "1.0.9",
  "description": "A react UI",
  "module": "esm/index.js",   //指定 es6模块的入口文件
  "main": "lib/index.js",  //指定 CommonJs模块的入口文件
  "homepage": "https://github.com/cindydove/React_DX_UI.git#readme",
  "authors": {
    "name": "cindydove",
    "email": "cindydove@qq.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cindydove/React_DX_UI.git"
  },
  "typings": "lib/index.d.ts", // 定义类型入口文件
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": [
    "lib",
    "esm"
  ],
  "scripts": {
    "commit": "git-cz",
    "dev": "dumi dev",
    "start": "npm run dev",
    "build:site": "rimraf doc-site && dumi build",
    "preview:site": "cross-env SITE_BUILD_ENV=PREVIEW npm run build:site && serve doc-site",
    "deploy:site": "npm run build:site && gh-pages -d doc-site",
    "build:types": "tsc -p tsconfig.build.json && cpr lib esm", // 执行tsc命令生成类型声明文件    此处使用cpr将lib的声明文件拷贝了一份，并将文件夹重命名为esm，用于后面存放 ES module 形式的组件。这样做的原因是保证用户手动按需引入组件时依旧可以获取自动提示。
    "clean": "rimraf lib esm dist",
    "build": "npm run clean && npm run build:types && gulp",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:update": "jest --updateSnapshot",
    "release": "npm run build && np --no-cleanup --no-tests --any-branch",  //打包并发布最新包
    "new": "plop --plopfile ./scripts/plopfile.mjs"  // 新建文件
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "lint-staged": {
    "src/**/*.ts?(x)": [
      "prettier --write",
      "eslint --fix",
      "jest --bail --findRelatedTests",
      "git add"
    ],
    "src/**/*.less": [
      "stylelint --syntax less --fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@babel/core": "^7.16.7",
    "@babel/plugin-proposal-class-properties": "^7.16.7",
    "@babel/plugin-transform-runtime": "^7.16.7",
    "@babel/preset-env": "^7.16.7",
    "@babel/preset-react": "^7.16.7",
    "@babel/preset-typescript": "^7.16.7",
    "@commitlint/cli": "^16.0.1",
    "@commitlint/config-conventional": "^16.0.0",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@types/jest": "^27.4.0",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "@types/testing-library__react": "^10.2.0",
    "@umijs/fabric": "^2.10.0",
    "commitizen": "^4.2.4",
    "cpr": "^3.0.1",
    "cross-env": "^7.0.3",
    "cz-conventional-changelog": "^3.3.0",
    "dumi": "^1.1.38",
    "gh-pages": "^3.2.3",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^8.0.0",
    "gulp-babel": "^8.0.0",
    "gulp-cssnano": "^2.1.3",
    "gulp-less": "^5.0.0",
    "husky": "^7.0.4",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^27.4.7",
    "lint-staged": "^12.1.5",
    "np": "^7.6.0",
    "plop": "^3.0.5",
    "prettier": "^2.5.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "serve": "^13.0.2",
    "through2": "^4.0.2",
    "ts-jest": "^27.1.2",
    "ts-node": "^8.10.1",
    "typescript": "^4.5.4"
  },
  "dependencies": {
    "@babel/runtime": "^7.16.7",
    "antd": "^4.18.3",
    "prop-types": "^15.8.1"
  }
}

```
## tsconfig.build.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "emitDeclarationOnly": true }, // 只生成声明文件
  "exclude": ["**/__tests__/**", "**/demo/**", "node_modules", "lib", "esm"] // 排除示例、测试以及打包好的文件夹
}
```


