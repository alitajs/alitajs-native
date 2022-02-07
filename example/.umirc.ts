import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  metas: [
    {
      name: 'viewport',
      content:
        'width=width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover',
    },
  ],
  hash: true,
  dynamicImport: {},
});
