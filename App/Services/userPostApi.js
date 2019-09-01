import R from 'ramda'
import apisauce from 'apisauce'

// our "constructor"
const create = () => {
  const api = apisauce.create({
    baseURL: 'http://192.168.43.208:8080/',
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  const createPost = data => {
    // {text, uid}
    return new Promise((resolve, reject) => {
      api
        .post('/post', data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  const readPost = data => {
    // optional {username, uid}
    return new Promise((resolve, reject) => {
      api
        .get('/post', data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  const updatePost = data => {
    // {postId, uid, ...basicField}
    const { postId } = data
    return new Promise((resolve, reject) => {
      api
        .put(`/post/${postId}`, data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  const deletePost = data => {
    // {postId, uid}
    const { postId } = data
    return new Promise((resolve, reject) => {
      api
        .delete(`/post/${postId}`, data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return {
    // a list of the API functions
    createPost,
    readPost,
    updatePost,
    deletePost,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
