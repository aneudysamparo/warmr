export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/../modules/**/*.entity.*'],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
  migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
};
