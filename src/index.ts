// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';

type Platform = 'ios' | 'android';

interface SyncOptions {
  deployment?: boolean;
}

export default function(api: IApi) {
  const {
    paths,
    utils: { chalk, spawn, yargs },
  } = api;
  function initNative() {
    console.log(chalk.cyan('native init ...'));
    spawn.sync('yarn', ['add', '@capacitor/core'], { stdio: 'inherit' });
    spawn.sync('yarn', ['add', '-D', '@capacitor/cli'], { stdio: 'inherit' });
    spawn.sync('npx', ['cap', 'init'], { stdio: 'inherit' });
  }
  function addPlatform(platform: Platform) {
    console.log(chalk.cyan(`add platform ${platform} ...`));
    spawn.sync('yarn', ['add', `@capacitor/${platform}`], { stdio: 'inherit' });
    spawn.sync('npx', ['cap', 'add', platform], { stdio: 'inherit' });
  }
  function syncProject({
    options = {},
    platform,
  }: {
    options?: SyncOptions;
    platform?: Platform;
  }) {
    console.log(chalk.cyan('sync project ...'));
    const params = ['cap', 'sync'];
    if (options.deployment) {
      params.push('--deployment');
    }
    if (platform) {
      params.push(platform);
    }
    spawn.sync('npx', params, { stdio: 'inherit' });
  }
  api.registerCommand({
    name: 'native',
    description: 'native support',
    fn: async ({ args }) => {
      console.log('args:', args);
      const _args = yargs.boolean('deployment').parse(process.argv.slice(3));
      console.log('_args', _args);
      const subCommand = args._[0];
      switch (subCommand) {
        case 'init': {
          initNative();
          break;
        }
        case 'add': {
          const platform = args._[1] as Platform;
          addPlatform(platform);
          break;
        }
        case 'sync': {
          syncProject({
            options: { deployment: _args.deployment },
            platform: _args._[1] as Platform,
          });
          break;
        }
      }
    },
  });
}
