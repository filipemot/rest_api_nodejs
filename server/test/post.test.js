const axios = require('axios');
const crypto = require('crypto');
const postsService = require('../service/postsService');

const generate = function() {
    return crypto.randomBytes(20).toString('hex');
}

const request = function(url, method, data) {
    return axios({
        method: method,
        url: url,
        data: data,
        validateStatus: false
    });
}

test('Should get posts', async function () {
    const post1 = await postsService.savePost({ title: generate(), content: generate()});
    const post2 = await postsService.savePost({ title: generate(), content: generate()});
    const post3 = await postsService.savePost({ title: generate(), content: generate()});
    

    const response = await request('http://localhost:3000/posts','GET');

    const posts = response.data;
    expect(response.status).toBe(200);
    expect(posts.length).toBe(3);

    await postsService.deletePost(post1.id);
    await postsService.deletePost(post2.id);
    await postsService.deletePost(post3.id);
});

test('Should save posts', async function () {
    const data = { title: generate(), content: generate()};

    const response = await request('http://localhost:3000/posts','POST', data);

    const post = response.data;
    expect(response.status).toBe(201);
    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);

    await postsService.deletePost(post.id);
});

test('Should not save posts', async function () {
    const data = { title: generate(), content: generate()};

    const response1 = await request('http://localhost:3000/posts','POST', data);
    const response2 = await request('http://localhost:3000/posts','POST', data);

    const post = response1.data;
    expect(response1.status).toBe(201);
    expect(response2.status).toBe(409);
    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);

    await postsService.deletePost(post.id);
});


test('Should update posts', async function () {
    const post = await postsService.savePost({ title: generate(), content: generate()});
    post.title = generate();
    post.content = generate();

    const response = await request(`http://localhost:3000/posts/${post.id}`,'put', post);
    const updatedPost = await postsService.getPost(post.id);
    expect(response.status).toBe(204);
    expect(updatedPost.title).toBe(post.title);
    expect(updatedPost.content).toBe(post.content);

    await postsService.deletePost(post.id);
});

test('Should not update posts', async function () {
    const post = {
        id: 1
    };
    const response = await request(`http://localhost:3000/posts/${post.id}`,'put', post);
    expect(response.status).toBe(404);
});

test('Should delete posts', async function () {
    const post = await postsService.savePost({ title: generate(), content: generate()});
    const response = await request(`http://localhost:3000/posts/${post.id}`,'delete');
    const posts = await postsService.getPosts();
    expect(posts).toHaveLength(0);
    expect(response.status).toBe(204);
    await postsService.deletePost(post.id);
});