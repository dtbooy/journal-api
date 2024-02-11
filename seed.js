import { closeConnection, EntryModel, CategoryModel } from "./db.js";

const categories = [
  { name: "Food" },
  { name: "Gaming" },
  { name: "Coding" },
  { name: "Other" },
];

//delete all documents in entry model
await CategoryModel.deleteMany();
console.log("Deleted Category Entries");

const catRes = await CategoryModel.insertMany(categories); //Note returns array of db entries coresponding to order of addition
console.log("Inserted Category Entries");

const entries = [
  { category: catRes[0], content: "Pizza is ok" }, //can give just ._id or the whole document object
  { category: catRes[0]._id, content: "I liek chocolate milk" },
  { category: catRes[1]._id, content: "It's all objects" },
  {
    category: catRes[2]._id,
    content: "I think I might be able to code something oneday",
  },
  {
    category: catRes[3]._id,
    content:
      "10 things you need to know about rocket rollerblades.",
  },
  { category:  catRes[3]._id, content: "Are you a Ninja?" },
];

//delete all documents in entry model
await EntryModel.deleteMany();
console.log("Deleted Entries");

await EntryModel.insertMany(entries);
console.log("Inserted Entries");

closeConnection();
