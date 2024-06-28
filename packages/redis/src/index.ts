import Redis, {RedisKey, RedisOptions, RedisValue} from "ioredis";
import  json5 from 'json5';
export class RedisDriver{
    protected static inst: RedisDriver;
    public static config: RedisOptions;
    options: RedisOptions;
    redis: Redis;

    constructor(options: RedisOptions) {
        const defaultOption: RedisOptions = {};
        this.options = Object.assign({}, defaultOption, options);
        this.redis = new Redis(this.options);
        this.redis.on('error', (error: Error) => {
            console.log(new Error(error.stack));
        });
    }
    get client() {
        return this.redis;
    }

    /**
     *
     * @param key
     * @param value
     */
    async set(key: RedisKey, value: RedisValue) {
        return  this.redis.set(key, json5.stringify(value));
    }
    /**
     *
     * @param key
     * @param value
     * @param seconds
     */
    async setEx(key: RedisKey, value: RedisValue, seconds: number) {
        return  this.redis.setex(key, seconds, json5.stringify(value));
    }
    async append(key: RedisKey, value: RedisValue) {
        return  this.redis.append(key, value);
    }
    async get(key: RedisKey) {
        try {
            return json5.parse(await this.redis.get(key));
        } catch (e) {
            return {};
        }
    }
    async mGet(args: RedisKey[]): Promise<string[] | null> {
        try {
            return await this.redis.mget(...args);
        } catch (e) {
            return [];
        }
    }
    async mSet(args: RedisKey[]) {
        return  this.redis.mset(args);
    }
    async mDel(args: RedisKey[]) {
        return  this.redis.del(args);
    }
    async del(key: RedisKey) {
        return  this.redis.del(key);
    }
    async hSet<T>(key: RedisKey, field: string, value: RedisValue) {
        return  this.redis.hset(key, field, json5.stringify(value));
    }
    async hGet<T>(key: RedisKey, field: string) {
        try {
            return json5.parse(await this.redis.hget(key, field));
        } catch (e) {
            return [];
        }
    }
    static get install() {
        return RedisDriver.getInstance();
    }
    /**
     * 单例模式
     */
    public static getInstance() {
        if (!(RedisDriver.inst instanceof RedisDriver)) {
            if (RedisDriver.config===null) {
                throw new Error('请先添加redis的配置');
                process.exit(1);
            }
            RedisDriver.inst = new RedisDriver(RedisDriver.config);
        }
        return RedisDriver.inst;
    }
    /**
     * 设置配置信息
     *
     * @param $config
     */
    public static setConfig(config: RedisOptions) {
        RedisDriver.config = config;
    }
}