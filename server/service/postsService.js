const postData = require('../data/postsData');

exports.getPosts = () => {
    return postData.getPosts();
};

exports.deletePost = (post) => {
    return postData.deletePost(post);
};

exports.savePost = async(post) => {
    const existingPosts = await postData.getPostByTitle(post.title);
    if(existingPosts) throw new Error('Post already exists');
    return postData.savePost(post);
};

exports.getPost = async (id) => {
    const post = await postData.getPost(id);
    if(!post) throw new Error('Post not found');
    return post;
};

exports.updatePost = async (id,post) => {
    await exports.getPost(id);
    return postData.updatePost(id, post);
};

exports.deletePost = (id) => {
    return postData.deletePost(id);
};