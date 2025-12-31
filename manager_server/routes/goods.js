import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.sendResult("this is goods page", 200, 'success');
});

export default router;