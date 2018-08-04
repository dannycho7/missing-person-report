const path = require("path");
const fs = require("fs");

const alignEncode = (imgBlob) => {
	return new Promise((resolve, reject) => {
		resolve(fs.readFileSync(path.join(__dirname, "sample_images/cropped.dump")));
	});
};

const manipulateAll = (imgBlob) => {
	return new Promise((resolve, reject) => {
		resolve(fs.readFileSync(path.join(__dirname, "sample_images/data_man.dump")));
	});
};

module.exports.alignEncode = alignEncode;
module.exports.manipulateAll = manipulateAll;