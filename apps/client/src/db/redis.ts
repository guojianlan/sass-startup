import { RedisDriver } from '@sass-startup/redis';

export class RedisDb {
  static redis: typeof RedisDriver;
  static get install() {
    return new Promise<typeof RedisDriver>(async (resolve, reject) => {
      if (RedisDb.redis) {
        resolve(RedisDriver);
      }
      await RedisDb.getInstall();
      resolve(RedisDriver);
    });
  }
  static async getInstall() {
    if (RedisDb.redis === undefined) {
      // 配置
      RedisDriver.setConfig({
        host: process.env.redis_host,
        port: parseInt(process.env.redis_port!,10),
        password: process.env.redis_password,
        db:  parseInt(process.env.redis_db!,10),
      });
      return RedisDriver;
    }
    return RedisDriver;
  }
}
