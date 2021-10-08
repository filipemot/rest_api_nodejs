const postData = require('../data/postsData');

exports.getPosts = () => {
    return postData.getPosts();
};

exports.deletePost = (post) => {
    return postData.deletePost(post);
};

exports.savePost = (post) => {
    return postData.savePost(post);
};

exports.getPost = (id) => {
    return postData.getPost(id);
};

exports.updatePost = (id,post) => {
    return postData.updatePost(id, post);
};

exports.deletePost = (id) => {
    return postData.deletePost(id);
};