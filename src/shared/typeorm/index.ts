import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1425",
  database: "apivendas",
  entities: ["./src/modules/**/typeorm/entities/*.ts"],
  migrations: [
    "./src/shared/typeorm/migrations/*.ts"
  ],
  synchronize: true
});

const main = async () => {
  console.time('main');
  await appDataSource.initialize();
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
