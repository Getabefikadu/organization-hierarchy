const config = () => ({
  port: Number(process.env.APP_PORT || 3333),
  database: {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: ['dist/entities/*{.entity.js,.entity.ts}'],
  },
});

export default config;
export * from './database.config';
