import app from "./app.js";
import { blogDatabase } from "./src/database/blogDB.js";
const PORT = process.env.PORT || 4000;

blogDatabase();

app.listen(4000, () => {
  console.log(
    `Server listening on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
