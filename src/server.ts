/* eslint-disable no-console */
import createApp from "src/app";
import { connectSQLite, createTables } from "src/utils/sqlite-connect";

async function launchServer() {
  // connect to sqlite
  const db = await connectSQLite('main-database.db');
  await createTables(db);

  // Serving Express instance
  const app = await createApp(db);
  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    console.info("Express server started on port: " + port);
  });
}

launchServer().catch((error) => {
  console.error("An error occurred: ", error);
  process.exit(1);
});
