const mongoose = require("mongoose");
const { Schema } = mongoose;

const DB_URI = process.env.DB_URI || "mongodb://localhost/missing-person-report";

mongoose.connect(DB_URI, () => console.log("Connected to DB"));

const missingPersonSchema = new Schema({
	name: String,
	last_seen: Number,
	age: Number,
	img_blob: String
});

const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);

module.exports.MissingPerson = MissingPerson;
