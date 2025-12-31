import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.sendResult("this is category page", 200, 'success');
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