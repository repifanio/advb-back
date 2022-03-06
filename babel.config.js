module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@modules': './src/modules',
          '@shared': './src/shared',
        },
      },
    ],
  ],
  ignore: ['**/**/*.spec.ts'],
};
