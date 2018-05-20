const Promise = require('bluebird')
const { promisify } = Promise
const pool = require('../postgres/db')
const uuid = require('uuid')

const query = promisify(pool.query)

// GET /test
exports.test = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}

exports.add_new_post = function(req, res, next) {
  console.log('asddsadasdasds')
  const info = req.body
  const values = []
  console.log(info)
  const query_string = `INSERT INTO posts (post_id, user_id, title, project_release, description)
  VALUES ('${info.post_id}', '${info.user_id}', '${info.title}', '${info.project_release}', '${info.description}')`
  console.log(query_string)
  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table posts')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
    })
  })
}

exports.add_new_user = function(req, res, next) {
  console.log('asddsadasdasds')
  console.log(req.body)
  const info = req.body
  const values = []
  console.log(info)
  const query_string = `INSERT INTO users (user_id, username)
  VALUES ('${info.user_id}', '${info.username}')`
  console.log(query_string)
  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table posts')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
      user_id: info.user_id,
    })
  })
}

exports.get_all_posts = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT posts.post_id, posts.title, users.username, posts.project_release, posts.description, posts.created_at FROM posts JOIN users ON posts.user_id = users.user_id`


  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table posts')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
      posts: results.rows,
    })
  })
}


exports.get_all_votes = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT votes.user_id, votes.post_id FROM votes WHERE active = 'true'`


  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table votes')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
      votes: results.rows,
    })
  })
}

exports.get_all_users = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT * FROM users`


  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table users')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
      users: results.rows,
    })
  })
}
