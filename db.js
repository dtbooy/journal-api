import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//URI Saved in .env
//connect mongoose - should be done as early as possible (before register app)
try{
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? "MongoDB Connected." : "MongoDB failed to connect")
}
catch(err) { console.log(err)};

const closeConnection = async() => {
    await mongoose.disconnect()
    console.log("MongoDB disconnected.")
};

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true }
})
const CategoryModel = mongoose.model('Category', categoriesSchema)

// Create schema - schemas are plural
const entriesSchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: "Category" }, 
  content: { type: String, required: true },
});
// Create Model - model is singular
const EntryModel = mongoose.model("Entry", entriesSchema);

export { closeConnection, EntryModel, CategoryModel };