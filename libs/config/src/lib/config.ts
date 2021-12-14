import {Product, User} from "@tnrdpractice/utils";

const config = {
  mysql: {
    name: 'default',
    type: 'mysql',
    host: 'ts_practice_db',
    port: 3306,
    username: 'root',
    password: 'rootpassword',
    database: 'practice',
    entities: [User, Product]
  },
  redis: {
    host: 'redis://ts_practice_redis',
    port: 6379
  }
}

config.mysql.name = process.env.DB_CONN_NAME ? process.env.DB_CONN_NAME : config.mysql.name;
config.mysql.type = process.env.DB_CONN_TYPE ? process.env.DB_CONN_TYPE : config.mysql.type;
config.mysql.host = process.env.DB_HOST ? process.env.DB_HOST : config.mysql.host;
config.mysql.port = process.env.DB_PORT ? +process.env.DB_PORT : config.mysql.port;
config.mysql.username = process.env.DB_USERNAME ? process.env.DB_USERNAME : config.mysql.username;
config.mysql.password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : config.mysql.password;
config.mysql.database = process.env.DB_NAME ? process.env.DB_NAME : config.mysql.database;

config.redis.host = process.env.REDIS_HOST ? process.env.REDIS_HOST : config.redis.host;
config.redis.port = process.env.REDIS_PORT ? +process.env.REDIS_PORT : config.redis.port;

export default config;
