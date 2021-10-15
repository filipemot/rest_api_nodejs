const database = require('../infra/database');

exports.getPosts = async () => {
    const result = await database.query('SELECT * FROM blog.posts');
    return result;
}

exports.getPost = async (id) => {
    return await database.oneOrNone('SELECT * FROM blog.posts where id=$1', [id]);
}

exports.getPostByTitle = async (title) => {
    return await database.oneOrNone('SELECT * FROM blog.posts where title=$1', [title]);
}

exports.savePost = async (post) => {
    return await database.one('insert into blog.posts(title, content) values($1,$2) returning *', [post.title, post.content]);
}

exports.updatePost = async (id,post) => {
    return await database.none('update blog.posts set title=$1, content=$2 where id=$3', [post.title, post.content, id]);
}

exports.deletePost = async (id) => {
    return await database.none('delete from blog.posts where id=$1', [id]);
}