const database = require('../infra/database');

exports.getPosts = async () => {
    const result = await database.query('SELECT * FROM blog.posts');
    return result;
}