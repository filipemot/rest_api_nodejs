const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async (req, res) => {
    const posts = await postsService.getPosts();
    res.json(posts);
});

router.post('/posts', async (req, res) => {
    const post = await postsService.savePost(req.body);
    res.json(post);
});

router.put('/posts/:id', async (req, res) => {
    const post = await postsService.updatePost(req.params.id,req.body);
    res.json(post);
});

router.delete('/posts/:id', async (req, res) => {
    await postsService.deletePost(req.params.id);
    res.end();
});

module.exports = router;