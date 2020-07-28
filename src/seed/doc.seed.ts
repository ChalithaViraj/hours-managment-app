import Doc from "../schemas/doc-schema";

const fs = require('fs');

export default async function seedDocs() {

    let docs = await Doc.find({});
    if (docs.length) {
        return docs;
    }

    let docsFile = fs.readFileSync('src/seed/data/docs.json');
    let docsJson = JSON.parse(docsFile);

    const doc = await Doc.create(docsJson);
    return [doc];
}
