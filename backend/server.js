import app from "./app.js";
import { blogDatabase } from "./database/blogDB.js";

blogDatabase();

app.listen(4000, () => {
	console.log("Server listening on port http://localhost:4000");
});
