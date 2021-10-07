const axios = require('axios');

test('Should get posts', async function () {
    const response = await axios({
        url: 'http://localhost:3000/posts',
        method: 'GET'
    });

    const posts = response.data;
    expect(posts).toHaveLength(1);
    const [firstPost] = posts;
    expect(firstPost.id).toBe(1);
});