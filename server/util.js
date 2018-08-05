require("dotenv").config();

const path = require("path");
const fs = require("fs");
const request = require("request");
const { exec } = require("child_process");

const alignEncode = (img_blob) => {
	return new Promise((resolve, reject) => {
		return resolve({ img: fs.readFileSync(path.join(__dirname, "sample_images/cropped.dump")) });

		let req_options = {
			url: process.env.MODEL_BASE_URL + "/api/align_encode",
			method: "post",
			body: {
				img: img_blob
			},
			json: true
		};

		request(req_options, (err, res, body) => {
			if (err) {
				throw err;
			}

			let { face_found, img, z } = body;

			if (!face_found) {
				throw new Error("Face not found");
			}

			resolve({ img, z: z[0] });
		});
	});
};

const manipulate = (z, age, last_seen) => {
	return new Promise((resolve, reject) => {
		return resolve(fs.readFileSync(path.join(__dirname, "sample_images/data_man.dump")));

		let req_options = {
			url: process.env.MODEL_BASE_URL + "/api/manipulate",
			method: "post",
			body: {
				typ: 39,
				alpha: last_seen / age,
				z
			},
			json: true
		};

		console.log(req_options);

		request(req_options, (err, res, body) => {
			let { img } = body;

			resolve(img);
		});
	});
};

module.exports.alignEncode = alignEncode;
module.exports.manipulate = manipulate;