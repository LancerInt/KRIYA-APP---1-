module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '@features': './src/features',
          '@shared': './src/shared',
          '@services': './src/services',
          '@db': './src/database',
          '@repos': './src/repositories',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@nav': './src/navigation'
        }
      }
    ]
  ]
};
