import type { RedisClient } from 'redis';

export const create_redis = ({
    redis_client,
}: {
    redis_client: RedisClient;
}) => ({
    get: (key: string) => get(redis_client, key),
    set: (key: string, value: string) => set(redis_client, key, value),
    setex: (key: string, value: string, exp_sec: number) =>
        setex(redis_client, key, value, exp_sec),
    delete: (key: string | string[]) => delete_(redis_client, key),
    exists: (key: string) => exists(redis_client, key),
});

export const get = (redis: RedisClient, key: string): Promise<string> =>
    new Promise((resolve, reject) => {
        redis.get(key, (error, value) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(value!);
        });
    });

export const set = (
    redis: RedisClient,
    key: string,
    value: string
): Promise<boolean> =>
    new Promise((resolve, reject) => {
        redis.set(key, value, (error, ok) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(ok === 'OK');
        });
    });

export const setex = (
    redis: RedisClient,
    key: string,
    value: string,
    exp_sec: number
): Promise<boolean> =>
    new Promise((resolve, reject) => {
        redis.setex(key, exp_sec, value, (error, ok) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(ok === 'OK');
        });
    });

export const delete_ = (
    redis: RedisClient,
    key: string | string[]
): Promise<number> =>
    new Promise((resolve, reject) => {
        redis.del(key, (error, r) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(r);
        });
    });

export const exists = (redis: RedisClient, key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        redis.exists(key, (error, r) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(r === 1);
        });
    });
