/* eslint-disable no-console */
import createApp from "src/app";

async function launchServer() {
  // Serving Express instance
  const app = createApp();
  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    console.info("Express server started on port: " + port);
  });
}

launchServer().catch((error) => {
  console.error("An error occurred: ", error);
  process.exit(1);
});
