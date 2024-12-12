const User = require('../models/User');
const bcrypt = require('bcrypt');
const {errorHandler, createAccessToken} = require('../auth.js');

// 1) Register
module.exports.registerUser = (req, res) => {
	const {id, name, email, password} = req.body;

	if(!email.includes("@")){
		return res.status(400).json({message: 'Invalid email format!'});
	}

	if(password.length < 8){
		return res.status(400).json({message: 'password must be at least 8 characters'});
	}


	return User.findOne({name: name}).then(result => {
		if(result){
			console.log(result);
			return res.json({
				message: `User account is already existing. Please login instead.`
			});
		}

		let newUser = new User({
			name,
			email,
			password: bcrypt.hashSync(password, 10)
		})

		newUser.save()
		.then(result => res.status(201).json({message: 'Registered Successfully'}))
		.catch(error => errorHandler(error,req,res));
	})

}

// 2) Login
module.exports.loginUser = (req, res) => {
	const {email, password} = req.body;

	if(email.includes("@")){
		return User.findOne({email})
		.then(result => {
			if(result === null){
				return res.status(404).json({message: `No account found`});
			}

			const isPasswordCorrect = bcrypt.compareSync(password, result.password) ? res.status(200).json({access: createAccessToken(result)}): res.status(401).json({message: `Incorrect email or password!`});

		})
		.catch(error => errorHandler(error, req, res));
	} else {
		return res.status(400).json({message: `Invalid email format.`});
	}
}

// 3) Retrieve User Details
module.exports.retrieveUserDetails = (req, res) => {
	const userId = req.user.id;

	return User.findById(userId)
	.then(result => {
		if(result){
			return res.status(200).json({
				user: {
					_id: result._id,
					email: result.email,
					__v: result.__v
				}
			})
		}

		return res.status(403).json({message: `Invalid signature`});
	})
	.catch(error => errorHandler(error, req, res));
} 

