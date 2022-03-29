import { config } from "dotenv";
import path from "path";

// Loading environment variables
config({
  path: path.resolve(process.cwd(), ".env"),
});
