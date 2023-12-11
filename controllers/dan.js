import { MongoClient } from 'mongodb';
const myurl = 'mongodb://localhost:27017';

MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err);
    db = client.db('test');
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});

const controller = {};

controller.home = (req, res) => {
    res.render('dan/home');
};

controller.reportForm = (req, res) => {
    res.render('dan/report');
};

controller.getReport = (req, res) => {
    console.log(req.files)
    for (file in req.files) {
        var img = fs.readFileSync(file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database

        var finalImg = {
            contentType: file.mimetype,
            image: new Buffer(encode_image, 'base64'),
        };
        db.collection('quotes').insertOne(finalImg, (err, result) => {
            console.log(result);

            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/');
        });
    }
    console.log(req.body);
    if (req.body.name) {
        res.json({ message: 'success' });
    } else {
        res.json({ message: 'fail' });
    }
};

export default controller;
