import express from "express";
import authorization from "../module/authenticate.js";

const router = express.Router();

//must use "await", otherwise categoryService[actionName] is undefined inside each route.action();
const categoryService =  await authorization.getService("CategoryService");


router.get("/", (req, res) => {
    
    //console.log("type of getAllCategory " + typeof categoryService["getAllCategory"]);
    categoryService["getAllCategory"]((err, data) =>{
        if(err)
            return res.sendResult(null, 400, err);

        return res.sendResult(data, 200, 'success');
    });
    //res.sendResult("this is category page", 200, 'success');
});

router.get("/search", (req, res) => {
    const id = req.query.id;
    res.sendResult(`this is category page searching id ${id}`, 200, 'success');
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.sendResult(`this is category page with id ${id}`, 200, 'success');
});



export default router;