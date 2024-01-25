import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let data = [
    {
        id: 0,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://picsum.photos/200/300',
        author: 'John Doe',
        date: '2020-01-04',
        likes: 0
    },
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://picsum.photos/300/200',
        author: 'Alex Doe',
        date: '2020-01-02',
        likes: 0
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://picsum.photos/200/300',
        author: 'Jeorge Bush',
        date: '2020-01-01',
        likes: 0
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://picsum.photos/300/200',
        author: 'Hensell Robert',
        date: '2012-12-30',
        likes: 0
    },
    {
        id: 4,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://www.lifewire.com/thmb/SXXIxF9Dk8xcHcn78erflIqFLRI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dawkinsmeme-09a60a478f2849178939f9bfe701a7dd.jpg',
        author: 'Noe Jara',
        date: '2019-12-28',
        likes: 0
    },
    
];

app.get('/', (req, res) => {
    res.render('index.ejs',{
        posts: data
    });
});

app.get('/post', (req, res) => {
    const id = req.query.id;
    const post = data.find(post => post.id == id);
    res.render('post.ejs', {
        post: post
    });
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.get('/my-posts', (req, res) => {
    const myPosts = data.filter(post => post.author == 'Noe Jara');
    res.render('my-posts.ejs',{
        posts: myPosts
  });
});

app.get('/edit', (req, res) => {
    const id = req.query.id;
    const post = data.find(post => post.id == id);
    res.render('create.ejs', {
        post: post
    });
});

app.post('/create', (req, res) => {

    const date = new Date();
    const newPost = {
        id: data.length,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        author: 'Noe Jara',
        date: date.toISOString().slice(0,10),
    }

    data.push(newPost);
    res.redirect('/');
})

app.post('/save', (req, res) => {
    const id = req.body.id;
    const post = data.find(post => post.id == id);
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const id = req.body.id;
    data = data.filter(post => post.id != id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
