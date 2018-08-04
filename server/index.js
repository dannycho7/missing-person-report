const bodyParser = require("body-parser");
const express = require("express");
const { alignEncode, manipulateAll } = require("./util");

const app = express();

app.use(bodyParser.json());

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