const API_IP = 'http://localhost:3004';

const fetchApi = (method, path, body) => {
    return fetch(`${API_IP}/${path}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(body),
    })
        .then(response => response.json())
}

const getPosts = () => {
    return fetchApi('GET', 'posts');
}

const createPost = (post) => {
    return fetchApi('POST', 'posts', post);
}

const editPost = ({id, post}) => {
    return fetchApi('PUT', `posts/${id}`, post);
}

const deletePost = (id) => {
    return fetchApi('DELETE', `posts/${id}`);
}

export {
    getPosts,
    createPost,
    editPost,
    deletePost,
}