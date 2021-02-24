
const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			console.log(isValid);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

//  console.log(req.body)
/*
	bcrypt.compare("apples", '$2a$10$i.WYHaVl16c0uHAiDQtlV.f9bpNS2zTvL82O8TTLypvFZU3w1RSTy', function(err, res) {
	    console.log('first guess', res)
	});
	bcrypt.compare("veggies", '$2a$10$i.WYHaVl16c0uHAiDQtlV.f9bpNS2zTvL82O8TTLypvFZU3w1RSTy', function(err, res) {
	    console.log('second guess', res)
	});
	*/

	/*Asynchronous
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

module.exports = {
	handleSignin: handleSignin
};

