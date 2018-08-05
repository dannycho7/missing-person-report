const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const alignEncode = (imgBlob) => {
	return new Promise((resolve, reject) => {
		exec(`python ${path.join(__dirname, "scripts/align_encode.py")} ${imgBlob}`, (err, stdout, stderr) => {
			resolve(fs.readFileSync(path.join(__dirname, "sample_images/cropped.dump")));
		});
	});
};

const manipulateAll = (imgBlob, age, last_seen) => {
	return new Promise((resolve, reject) => {
		exec(`python ${path.join(__dirname, "scripts/manipulate_all.py")} ${imgBlob} [] []`, (err, stdout, stderr) => {
			resolve(fs.readFileSync(path.join(__dirname, "sample_images/data_man.dump")));
		});
	});
};

module.exports.alignEncode = alignEncode;
module.exports.manipulateAll = manipulateAll;