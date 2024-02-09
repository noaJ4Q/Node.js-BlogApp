import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let data = [
    {
        id: 0,
        title: 'Lorem ipsum dolor sit am 0',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'John Doe',
        date: '2020-01-04',
        likes: 3
    },
    {
        id: 1,
        title: 'Lorem ipsum dolor sit am 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
        author: 'Alex Doe',
        date: '2020-01-02',
        likes: 1
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor sit am 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2yRdT1xenMf5uIItUTqUTP4gioX3ORSHsSM3k-IkVLw&s',
        author: 'Jeorge Bush',
        date: '2020-01-01',
        likes: 4
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor sit am 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Blog_%281%29.jpg',
        author: 'Hensell Robert',
        date: '2012-12-30',
        likes: 2
    },
    {
        id: 4,
        title: 'Lorem ipsum dolor sit am 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://www.lifewire.com/thmb/SXXIxF9Dk8xcHcn78erflIqFLRI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dawkinsmeme-09a60a478f2849178939f9bfe701a7dd.jpg',
        author: 'Noe Jara',
        date: '2019-12-28',
        likes: 4
    },
    {
        id: 5,
        title: 'Lorem ipsum dolor sit am 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptatum.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ00FxpyHsslrKah8AYyY01Gwu77MLbGglS-g&usqp=CAU',
        author: 'Noe Jara',
        date: '2018-11-20',
        likes: 1
    }
    
];

const POST_PER_PAGE = 5;

app.get('/', (req, res) => {
    let parameters = {};
    let dataFiltered;
    const filter = req.query.f;

    // SELECTING DATA BY FILTER IF EXISTS
    if (filter) {
        parameters.filter = filter;
        dataFiltered = data.toSorted((post1, post2) => post2[filter] - post1[filter]);
    } else{
        dataFiltered = data.toSorted((post1, post2) => compareDate(post1.date, post2.date));
    }

    // SELECTING RESULT DATA BY PAGE
    if (dataFiltered.length > 5){
        const pages = Math.ceil(dataFiltered.length / POST_PER_PAGE); // used to render pagination buttons
        parameters.pages = pages;
        if(req.query.p){
            const page = req.query.p;
            parameters.page = page;
            parameters.posts = dataFiltered.slice(POST_PER_PAGE * (page-1), POST_PER_PAGE * page);
        } else {
            parameters.page = 1;
            parameters.posts = dataFiltered.slice(0, POST_PER_PAGE);
        }
    } else{
        parameters.posts = dataFiltered;
    }

    res.render('index.ejs',parameters);
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

function compareDate(date1, date2){
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();

    return timestamp2 - timestamp1;
}