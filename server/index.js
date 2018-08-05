require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { alignEncode, manipulate } = require("./util");
const { MissingPerson } = require("./MissingPerson");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb'}));

app.get("/", (req, res) => {
	MissingPerson.find({}, null, { limit: 10 }, (err, people) => {
		res.render("index", { people });
	});
});

app.post("/missing_person", (req, res) => {
	let { name, last_seen, age, img } = req.body;

	alignEncode(img)
	.then(({ img: cropped_file, z: cropped_file_z }) => {
		manipulate(cropped_file_z, age, last_seen)
		.then((manipulated_file) => {
			let missing_person = new MissingPerson({
				name,
				last_seen,
				age,
				img_blob: cropped_file,
				man_img_blob: manipulated_file
			});

			missing_person.save(() => {
				res.redirect("/");
			});
		});
	});
});

app.post("/align_encode", (req, res) => {
	let { img } = req.body;

	if (!img) {
		throw new Error(`No image specified in ${req.url}`);
	}

	alignEncode(img)
	.then((cropped_file) => {
		res.end(cropped_file);
	});
});

app.post("/manipulate_all", (req, res) => {
	let { z } = req.body;

	if (!z) {
		throw new Error(`No image specified in ${req.url}`);
	}

	manipulateAll(z)
	.then((manipulated_file) => {
		res.end(manipulated_file);
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening in on port ${PORT}`));