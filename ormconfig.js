module.exports = {
  type: "mysql",
  host: "ts_practice_db",
  port: 3306,
  username: "root",
  password: "rootpassword",
  database: "practice",
  synchronize: false,
  logging: false,
  entities: ["libs/utils/src/lib/entities/*.ts"],
  subscribers: ["libs/utils/src/lib/subscribers/*.ts"],
  migrations: ["libs/utils/src/lib/migrations/*.ts"],
  cli: {
    entitiesDir: "libs/utils/src/lib/entities",
    subscribersDir: "libs/utils/src/lib/subscribers",
    migrationsDir: "libs/utils/src/lib/migrations"
  }
}
