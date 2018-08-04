const fs = require("fs");
const { MissingPerson } = require("./server/MissingPerson");

let miss = new MissingPerson({
	name: 'Danny Cho',
	last_seen: 2,
	age: 20,
	img_blob: fs.readFileSync("./server/sample_images/data_man.dump")
});

miss.save(() => console.log('Saved'));