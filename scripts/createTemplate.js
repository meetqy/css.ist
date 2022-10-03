const { join, resolve } = require("path");
const fs = require("fs");

require("dotenv").config();

const newTempIndex =
  +process.env.DEV_TEMPLATE_PATH.replace(/\/introduce\//, "") + 1;

const cwd = process.cwd();

// 创建 yml
function createIntroduce() {
  const yml = `title: ${newTempIndex}
tags:
    - xxx
previews:
    - 7.png theme device lang
    - 8.png theme device lang
    - 1.png light macbook en
    - 2.png dark macbook en
    - 3.png cupcake ipad zh
    - 4.png halloween ipad zh
    - 5.png garden iphone zh
    - 6.png black iphone en
source: xxx
development_record: 
    url: xxx
    name: xxx
template_folder: false`;

  fs.writeFile(join(cwd, `./introduce/${newTempIndex}.yml`), yml, () => {
    console.log("创建yml成功");
  });
}

// 创建模板
function createTemplate() {
  const vue = `<template>
  <div class="w-screen h-screen">${newTempIndex}</div>
</template>
  `;

  fs.writeFile(join(cwd, `./templates/t/${newTempIndex}.vue`), vue, () => {
    console.log("创建模板成功");
  });
}

// 更新 template/[path].vue
function updateTemplate() {
  const src = join(cwd, `./pages/template/[path].vue`);
  const content = fs.readFileSync(src, "utf-8");

  const t = `${newTempIndex - 1}: resolveComponent("T${newTempIndex - 1}"),`;
  const newT = `${newTempIndex - 1}: resolveComponent("T${
    newTempIndex - 1
  }"),\n  ${newTempIndex}: resolveComponent("T${newTempIndex}"),`;

  fs.writeFile(src, content.replace(t, newT), () => {
    console.log("更新 template/[path].vue 成功");
  });
}

// 更新 env
function updateEnv() {
  fs.writeFile(
    join(cwd, ".env"),
    `DEV_TEMPLATE_PATH=/introduce/${newTempIndex}`,
    () => {
      console.log("更新env成功");
    }
  );
}

createIntroduce();
createTemplate();
updateTemplate();
updateEnv();
