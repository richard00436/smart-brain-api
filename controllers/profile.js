
const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db('users').where({id})
		.then(user => {
			console.log(user)
			if (user.length) {
			res.json(user[0])				
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProfileGet //actuall with ES6 we only need the variable and dont need the value since they are the same	handleProfileGet: handleProfileGet
};

