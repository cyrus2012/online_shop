import express from "express";
import formatResponse from "./middleware/formatResponse.js";
//import auth, {login} from "./routes/auth.js";
//import login from "./middleware/user_auth.js";
import sys_passport from "./middleware/passport.js";
import ManagerService from "./service/ManagerService.js";
import RoleService from "./service/RoleService.js";
import authorization from "./module/authorization.js";




const app = express();
const PORT = 4000;


app.use(express.urlencoded({ extended: true }));
app.use(formatResponse);


sys_passport.setup(ManagerService.login);
authorization.setAuthorizationFunction(RoleService);

//const category = await import("./routes/category.js");
import category from "./routes/category.js";
import goods from "./routes/goods.js";

app.get("/", (req, res) => {
    //res.send("welcome");
    res.sendResult("welcome", 200, "success");
});


app.use("/sys_api/login", sys_passport.login);

//Except /sys_api/login, all api routes to /sys_api/* are protected by token authentication
app.use("/sys_api/{*splat}", sys_passport.tokenAuth);
app.use("/sys_api/category", category);
app.use("/sys_api/goods", goods);



//The bottom handler when no routes matches
//matched routes will return result and does not call next() method
app.use((req, res, next) => {
    res.sendResult(null, 404, "page not found");
});

app.listen(PORT, () => {
    console.log(`listening to localhost:${PORT}`);
})