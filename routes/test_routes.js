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

exports.add_new_comment = function (req, res, next) {
  const info = req.body
  const values = []
  console.log(info)
  console.log('test')
  const query_string = `INSERT INTO comments (comment_id, user_id, post_id, comment)
  VALUES ('${info.comment_id}', '${info.user_id}', '${info.post_id}', '${info.comment}')`
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



exports.add_new_post = function(req, res, next) {
  console.log('asddsadasdasds')
  const info = req.body
  const values = []
  console.log('pimpwagon')
  console.log(info)
  const query_string = `INSERT INTO posts (post_id, user_id, title, project_release, description, summary, state, url)
  VALUES ('${info.post_id}', '${info.user_id}', '${info.title}', '${info.project_release}', '${info.description}', '${info.summary}', '${info.state}', '${info.url}')`
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

exports.add_new_vote = function(req, res, next) {
  console.log('add_new_vote')
  const info = req.body
  const values = []
  console.log(info)
  const query_string = `INSERT INTO votes (vote_id, user_id, post_id)
  VALUES ('${info.vote_id}', '${info.user_id}', '${info.post_id}')`
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

exports.get_all_comments = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT b.username,
                               a.post_id,
                               a.comment,
                               a.created_at
                               FROM comments a
                               INNER JOIN users b
                               ON a.user_id = b.user_id
                        `
  console.log(query_string)
  query(query_string, values, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Failed to get table posts')
    }
    console.log(results)
    res.json({
      message: 'Successfull retrieval',
      comments: results.rows,
    })
  })
}

exports.get_all_posts = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT a.post_id, a.title, b.username, a.project_release, a.description, a.summary, a.url, a.state, a.created_at, COALESCE(c.num_votes, 0) AS num_votes
                          FROM posts a
                          INNER JOIN users b
                          ON a.user_id = b.user_id
                          LEFT OUTER JOIN (
                            SELECT post_id, COUNT(*) AS num_votes
                              FROM votes
                              GROUP BY post_id
                          ) c
                          ON a.post_id = c.post_id
                        `


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

exports.add_new_comvote = function(req, res, next) {
  console.log('add_new_vote')
  const info = req.body
  const values = []
  console.log(info)
  const query_string = `INSERT INTO votes (comvote_id, user_id, comment_id)
  VALUES ('${info.comvote_id}', '${info.user_id}', '${info.comment_id}')`
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

exports.check_username = function(req, res, next) {
  const info = req.body
  const values = []
  const query_string = `SELECT * FROM users where users.username = '${info.username}'`

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
