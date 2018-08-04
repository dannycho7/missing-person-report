const bodyParser = require("body-parser");
const express = require("express");
const { alignEncode, manipulateAll } = require("./util");
const { MissingPerson } = require("./MissingPerson");

const app = express();

app.use(bodyParser.json());

app.get("/missing_person_list", (req, res) => {
	MissingPerson.find({}, null, { limit: 10 }, (err, people) => {
		res.json(people);
	});
});

app.post("/missing_person", (req, res) => {
	let { name, last_seen, age, img, man_img } = req.body;

	let missing_person = new MissingPerson({ name, last_seen, age, img_blob: img, man_img_blob: man_img });
	missing_person.save(() => {
		res.end();
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