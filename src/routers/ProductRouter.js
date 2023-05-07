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


router.get("/:slug", async(req, res, next) => {
    try {
        const { slug } = req.params
        console.log(slug)
        const result = await getSingleProduct({slug})
        console.log(result)

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
