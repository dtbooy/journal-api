import express from "express";
import { CategoryModel } from "../db.js";

const cats = express.Router();

//CREATE
cats.post("/", async (req, res) => {
    try {
        const newCat = await CategoryModel.create(req.body)
        res.status(201).send(newCat)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

});


//READ
cats.get("/", async (req, res) => {
    res.status(200).send(await CategoryModel.find().exec()); 
});
cats.get("/:id", async (req, res) => {
    res.status(200).send(
        await CategoryModel.findById(req.params.id).exec()
        .catch((err) => { 
            res.status(404).send({ error: err })
        })
    )
});

//UPDATE
cats.put("/:id", async (req, res) => {
    res.status(200).send(CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec());
});

//DELETE
cats.delete("/:id", async (req, res) => {
    res.status(204).send(await CategoryModel.findByIdAndDelete(req.params.id).exec());
})

export default cats