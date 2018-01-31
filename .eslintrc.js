// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'semi': 0,
    'no-tabs': 0,
    "no-irregular-whitespace": 0,
    // 函数块前面要加空格
    'space-before-blocks': 0, 
    // 函数参数前面要加空格
    'space-before-function-paren': 0, 
    // 一致的缩进
    'indent': 0
  }
}
