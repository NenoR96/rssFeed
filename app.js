const express = require('express');
const fs = require('fs');
const crypto = require("crypto");

const app = express()
const port = 3000
const convert = require('xml-js');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/', (req, res) => {
    fs.readFile('xml.json', 'utf8', function (err, fileData) {
        if (err) throw err;
        let data = JSON.parse(fileData);

        [...Array(randomIntFromInterval(1, 6))].forEach((element, index) => {
            let obj = {
                title: "Random post " + (index + 1),
                link: "https://www.lipsum.com/",
                guid: crypto.randomBytes(16).toString("hex"),
                pubDate: new Date().toGMTString(),
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                source: "hehe"
            }
            data.rss.channel.item.unshift(obj);
        });

        const json = JSON.stringify(data);
        const xml = convert.json2xml(json, { compact: true, spaces: 4 });
        res.type("text/xml").send(xml);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})