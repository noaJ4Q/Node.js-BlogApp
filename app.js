import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/post', (req, res) => {
    res.render('post.ejs');
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.get('/my-posts', (req, res) => {
    res.render('my-posts.ejs');
});

app.post('/create', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    console.log(title, content, image);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});