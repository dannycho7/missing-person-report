const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const alignEncode = (img_blob) => {
	return new Promise((resolve, reject) => {
		exec(`python ${path.join(__dirname, "scripts/align_encode.py")} ${img_blob}`, (err, stdout, stderr) => {
			resolve(fs.readFileSync(path.join(__dirname, "sample_images/cropped.dump")));
		});
	});
};

const manipulateAll = (z, age, last_seen) => {
	return new Promise((resolve, reject) => {
		exec(`python ${path.join(__dirname, "scripts/manipulate_all.py")} ${z} [] []`, (err, stdout, stderr) => {
			resolve(fs.readFileSync(path.join(__dirname, "sample_images/data_man.dump")));
		});
	});
};

module.exports.alignEncode = alignEncode;
module.exports.manipulateAll = manipulateAll;