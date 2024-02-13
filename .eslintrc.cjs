/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    //prettier更加注重美观
    //1.禁用perttier插件format on save 关闭
    //2.安装eslint插件，并配置保存时自动修复
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, //单引号
        semi: false, //无分号
        printWidth: 80, //每行宽度至多80字符
        trailingComma: 'none', //不加数组|对象后逗号
        endOfLine: 'auto' //换行符号不限制（win mac 不一致）
      }
    ],
    //eslint更关注于规范，如果不符合规范报错
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] //组件名必须多个单词除了index
      }
    ],
    'vue/no-setup-props-destructure': ['off'], //关闭props校验
    'no-undef': 'error' //添加未定义变量提示
  }
}
