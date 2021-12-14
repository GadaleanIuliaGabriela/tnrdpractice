export const config = {
  mysql: {
    connectionName: 'default',
    connectionType: 'mysql',
    host: 'ts_practice_db',
    port: 3306,
    username: 'root',
    password: 'rootpassword',
    name: 'practice'
  },
  redis: {
    host: 'redis://ts_practice_redis',
    port: 6379
  }
}
