const postsRouter = require('express').Router();
const urlExist = require('url-exist')

const { Post, Category } = require('../db');

postsRouter.get('/', async (req, res) => {

    const posts = await Post.findAll({
        attributes: ['idPost', 'title', 'creationDate', 'image'],
        include: Category,
        order: [['creationDate', 'DESC']]
    });

    res.status(200).json(posts);
});

postsRouter.get('/:id', async (req, res) => {

    const post = await Post.findOne({
        where: { idPost: req.params.id },
        attributes: ['idPost', 'title', 'creationDate', 'image', 'content'],
        include: Category
    });

    if(!post) throw Error('post not found')

    res.status(200).json(post);
});

postsRouter.post('/', async (req, res) => {

    const { body } = req;
    const { title, creationDate, image, content, category } = body;

    const imageExists = await urlExist(image);

    const newPost = imageExists
        ? await Post.create({
            title,
            creationDate,
            image,
            content,
            CategoryIdCategory: category
        })
        : false
    ;

    if(!newPost) {
        throw Error('image url doesnt exist');
    } else {
        return res.status(201).json(newPost);
    }

});

postsRouter.patch('/:id', async (req, res) => {

    const { content } = req.body;

    const updatedPost = await Post.update(content, {
        where: { idPost: req.params.id }
    })

    if(updatedPost[0] === 0) throw Error ('post not found');

    res.status(200).json({
        message: 'Post has been updated'
    });

});

postsRouter.delete('/:id', async (req, res) => {

    const deletedPost = await Post.destroy({where: { idPost: req.params.id }});

    if(deletedPost === 0) throw Error('post not found');

    res.status(200).json({
        message: 'Post removed'
    });

});

module.exports = { postsRouter };