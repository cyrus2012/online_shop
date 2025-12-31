import express from "express";
import formatResponse from "./middleware/formatResponse.js";
import category from "./routes/category.js";
import goods from "./routes/goods.js";


const app = express();
const PORT = 4000;

app.use(formatResponse);

app.get("/", (req, res) => {
    //res.send("welcome");
    res.sendResult("welcome", 200, "get / successfully");
});


app.use("/category", category);
app.use("/goods", goods);

//no route matches
// app.use((req, res, next) => {
//     res.sendResult(null, 404, "page not found");
// });

app.get("/{*splat}", (req, res) => {
    res.sendResult(null, 404, "page not found");
});

app.listen(PORT, () => {
    console.log(`listening to localhost:${PORT}`);
})