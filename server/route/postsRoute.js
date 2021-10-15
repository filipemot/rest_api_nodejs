const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async (req, res, next) => {
    const posts = await postsService.getPosts();
    res.json(posts);
});

router.post('/posts', async (req, res, next) => {
    try {
        const post = await postsService.savePost(req.body);
        res.status(201).json(post);
    } catch (e) {
        next(e);
    }
});

router.put('/posts/:id', async (req, res, next) => {

    try {
        const post = await postsService.updatePost(req.params.id, req.body);
        res.status(204).json(post);
    } catch (e) {
        next(e);
    }
});

router.delete('/posts/:id', async (req, res, next) => {
    try {
        await postsService.deletePost(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;