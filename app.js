const express = require('express');
const fs = require('fs');
const crypto = require("crypto");

const app = express()
const port = 3000
const convert = require('xml-js');

app.get('/', (req, res) => {
    fs.readFile('xml.json', 'utf8', function (err, fileData) {
        if (err) throw err;
        let data = JSON.parse(fileData);

        [1,2,3,4,5].forEach((element) => {
            let obj = {
                title: "Random post " + element,
                link: "blabla",
                guid: crypto.randomBytes(16).toString("hex"),
                pubDate: new Date().toGMTString(),
                description: "teasdasdasd",
                source: "hehe"
            }
            data.rss.channel.item.push(obj);
        });

        const json = JSON.stringify(data);
        const xml = convert.json2xml(json, { compact: true, spaces: 4 });
        res.type("text/xml").send(xml);
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})