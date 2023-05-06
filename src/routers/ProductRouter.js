import express from "express";
import { getAllProduct, getSingleProduct } from "../model/product/ProductModel.js";

const router = express.Router();

router.get("/", async(req, res, next) => {
    try {
        const result = await getAllProduct()
console.log(result, "result")
        res.json({
            status:"success",
            message:"All products Fetched",
            result
        })
    } catch (error) {
        next(error)
        
    }
})


router.get("/:_id", async(req, res, next) => {
    try {
        const {_id} = req.params
        const result = await getSingleProduct(_id)

        res.json({
            status:"success",
            message:"single product Fetched",
            result
        })
    } catch (error) {
        next(error)
        
    }
})


export default router;
