import express from "express";
import { EntryModel } from "../db.js";

const entryRouter = express.Router();

entryRouter.get("/", async (req, res) => {res.send(await EntryModel.find().populate("category"))});

/// ":" prefix indicates id is a restful parameter
entryRouter.get("/:id", async (req, res) => {
  const entry = await EntryModel.findById(req.params.id).populate("category").catch((err) => {console.log(err.message)});
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send({ error: "Entry not found" });
  }
});

// PostRequest
entryRouter.post("/", async (req, res) => {
  try {
    //need to populate on the created document so need to await the create action then await the populate function 
    const insertedEntry = await (await EntryModel.create(req.body)).populate("category");
    // res with 201, newEntry
    res.status(201).send(insertedEntry);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Put Request
entryRouter.put("/:id", async (req, res) => {
  try {
    // findByIdAndUpdate
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // res with 200 (default - .status not required), newEntry
    if (updatedEntry) {
      res.send(updatedEntry);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE Request
entryRouter.delete("/:id", async (req, res) => {
  try {
    // findByIdAndUpdate
    const updatedEntry = await EntryModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    // res with 204 (No content)
    if (updatedEntry) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default entryRouter