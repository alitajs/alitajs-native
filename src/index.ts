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
  /**
   * Initialize Capacitor configuration by providing an app name, app ID, and an optional web directory for the existing web app
   */
  function initNative() {
    console.log(chalk.cyan('native init ...'));
    spawn.sync('yarn', ['add', '@capacitor/core'], { stdio: 'inherit' });
    spawn.sync('yarn', ['add', '-D', '@capacitor/cli'], { stdio: 'inherit' });
    spawn.sync('npx', ['cap', 'init'], { stdio: 'inherit' });
  }
  /**
   * Add a native platform project to your app
   * @param platform
   */
  function addPlatform(platform: Platform) {
    console.log(chalk.cyan(`add platform ${platform} ...`));
    spawn.sync('yarn', ['add', `@capacitor/${platform}`], { stdio: 'inherit' });
    spawn.sync('npx', ['cap', 'add', platform], { stdio: 'inherit' });
  }
  /**
   * Copy the web app build and Capacitor configuration file into the native platform project. Run this each time you make changes to your web app or change a configuration value
   * @param params
   * @param params.platform android, ios
   */
  function copyAssets({ platform }: { platform: Platform }) {
    console.log(
      chalk.cyan(`copy assets to ${platform ?? 'ios and android'} ...`),
    );
    const params = ['cap', 'copy'];
    if (platform) {
      params.push(platform);
    }
    spawn.sync('npx', params, { stdio: 'inherit' });
  }

  /**
   * Updates the native plugins and dependencies referenced in package.json
   * @param params
   * @param params.deployment Podfile.lock won’t be deleted and pod install will use --deployment option
   * @param params.platform android, ios
   */
  function updatePlugins(
    params: {
      deployment?: boolean;
      platform?: Platform;
    } = {},
  ) {
    const { deployment, platform } = params;
    console.log(chalk.cyan('update plugins ...'));
    const options = ['cap', 'update'];
    if (deployment) {
      options.push('--deployment');
    }
    if (platform) {
      options.push(platform);
    }
    spawn.sync('npx', options, { stdio: 'inherit' });
  }
  /**
   * This command runs copy and then update
   * @param params
   */
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
  /**
   * List all installed Cordova and Capacitor plugins.
   * @param params
   * @param params.platform android, ios
   */
  function listPlugins(params: { platform: Platform }) {
    console.log(chalk.cyan('list plugins ...'));
    const options = ['cap', 'ls'];
    if (params.platform) {
      options.push(params.platform);
    }
    spawn.sync('npx', options, { stdio: 'inherit' });
  }
  /**
   * Opens the native project workspace in the specified native IDE (Xcode for iOS, Android Studio for Android)
   * @param params
   * @param params.platform android, ios
   */
  function openProject(params: { platform: Platform }) {
    console.log(chalk.cyan('open project ...'));
    const options = ['cap', 'open'];
    if (params.platform) {
      options.push(params.platform);
    }
    spawn.sync('npx', options, { stdio: 'inherit' });
  }
  /**
   * This command first runs sync, then it builds and deploys the native app to a target device of your choice
   * @param params
   * @param params.options
   * @param params.options.list Print a list of target devices available to the given platform
   * @param params.options.target The target device to deploy to
   * @param params.platform android, ios
   */
  function runProject(params: {
    options?: { list?: boolean; target?: string };
    platform: Platform;
  }) {
    console.log(chalk.cyan('run project ...'));
    const args = ['cap', 'run'];
    if (params.options?.list) {
      args.push('--list');
    }
    if (params.options?.target) {
      args.push('--target', params.options.target);
    }
    if (params.platform) {
      args.push(params.platform);
    }
    spawn.sync('npx', args, { stdio: 'inherit' });
  }
  api.registerCommand({
    name: 'native',
    description: 'native support',
    fn: async ({ args }) => {
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
        case 'copy': {
          copyAssets({ platform: args._[1] as Platform });
          break;
        }
        case 'update': {
          const _args = yargs
            .boolean('deployment')
            .parse(process.argv.slice(3));
          updatePlugins({
            deployment: _args.deployment,
            platform: _args._[1] as Platform,
          });
          break;
        }
        case 'sync': {
          const _args = yargs
            .boolean('deployment')
            .parse(process.argv.slice(3));
          syncProject({
            options: { deployment: _args.deployment },
            platform: _args._[1] as Platform,
          });
          break;
        }
        case 'ls': {
          listPlugins({ platform: args._[1] as Platform });
          break;
        }
        case 'open': {
          openProject({ platform: args._[1] as Platform });
          break;
        }
        case 'run': {
          const _args = yargs.boolean('list').parse(process.argv.slice(3));
          runProject({
            options: {
              list: _args.list,
              target: _args.target as string,
            },
            platform: _args._[1] as Platform,
          });
          break;
        }
      }
    },
  });
}
