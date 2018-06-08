const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')


// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	// routes
	app.get('/test', json_encoding, Test.test)

	//get all details of posts needed for list
	app.post('/get_all_posts', json_encoding, Test.get_all_posts)

	//get all ACTIVE posts to count
	app.post('/get_all_votes', json_encoding, Test.get_all_votes)

	//get all user info
	app.post('/get_all_users', json_encoding, Test.get_all_users)

	app.post('/get_all_comments', json_encoding, Test.get_all_comments)

	app.post('/get_all_comvotes', json_encoding, Test.get_all_comvotes)

	//save new post to db
	app.post('/add_new_post', json_encoding, Test.add_new_post)

	//save new user to db
	app.post('/add_new_user', json_encoding, Test.add_new_user)

	app.post('/add_new_vote', json_encoding, Test.add_new_vote)

	app.post('/add_new_comvote', json_encoding, Test.add_new_comvote)

	app.post('/add_new_comment', json_encoding, Test.add_new_comment)

	app.post('/check_username', json_encoding, Test.check_username)

}
