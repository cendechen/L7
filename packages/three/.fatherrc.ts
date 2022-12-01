export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: {
    output:'es'
  },
  cjs: {
    output:'lib'
  },
  umd: {
    output: 'dist',
    externals: {
      "@antv/l7": "L7",
      "three": "Three"
    },
  },
  autoprefixer: {
    browsers: ['IE 11', 'last 2 versions'],
  },
  extraBabelPresets: [
    '@babel/preset-typescript'
  ],
  extraBabelPlugins: [
    // 开发模式下以原始文本引入，便于调试
    [
      // import glsl as raw text
      'babel-plugin-inline-import',
      {
        extensions: [
          '.glsl'
        ]
      }
    ],
    [
      'transform-import-css-l7'
    ],
  ],
};