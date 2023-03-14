import User from '../model/User.js';
import genId from '../helpers/genid.js';
import genJsonWebToken from '../helpers/genJWT.js';

const register = async (req, res) => {

	// prevent duplicated users
	const { email } = req.body;
	const userExists = await User.findOne({ email: email });

	if (userExists) {
		const error = new Error('User already exists');
		return res.status(400).json({ msg: error.message });
	}

	try {
		const user = new User(req.body);
		user.token = genId();
		const userAdded = await user.save();
		res.json(userAdded);
	} catch (error) {
		res.send('error');
	}
};

const auth = async (req, res) => {

	const {email, password} = req.body;
	// check if user exist
	const user = await User.findOne({ email: email });
	if (!user) {
		const error = new Error('User not found');
		return res.status(404).json({ msg: error.message });
	};

	// if user is confirmed
	if (!user.isConfirmed) {
		const error = new Error('User not confirmed');
		return res.status(403).json({ msg: error.message });
	};

	// check password
	if (await user.checkPassword(password)) {
		// make an object to prevent user information leak
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			jsonwebtoken: genJsonWebToken(user._id),
		})
	} else {
		const error = new Error('Wrong user or password');
		return res.status(403).json({ msg: error.message });
	};
};

const confirm = async (req, res) => {

	const { token } = req.params;
	//  check if user exist
	const user = await User.findOne({ token: token });
	if (!user) {
		const error = new Error('Invalid token');
		return res.status(403).json({ msg: error.message });
	};

	try {
		user.isConfirmed = true;
		user.token = ''
		await user.save();
		res.json({ msg: 'Confirmed!' });
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	// check if user exist
	const user = await User.findOne({ email: email });
	if (!user) {
		const error = new Error('User not found');
		return res.status(404).json({ msg: error.message });
	};

	try {
		user.token = genId();
		await user.save();
		res.json({ msg: "Verify you email" });
	} catch (error) {
		console.log(error);
	}
};

const checkToken = async (req, res) => {
	const { token } = req.params;

	const isValid = await User.findOne({ token: token });

	if (isValid) {
		console.log('valid');
		res.json({ msg: 'Token is valid, user exists' });
	} else {
		const error = new Error('Invalid Token');
		res.status(404).json({ msg: error.message });
		console.log('invalid');
	}
};

const newPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const user = await User.findOne({ token: token });

	if (user) {
		user.password = password;
		user.token = '';
		
		try {
			await user.save();
			res.json({ msg: 'Password has been saved successfully'});	
		} catch (error) {
			console.log(error);
		};
	} else {
		const error = new Error('Invalid Token');
		res.status(404).json({ msg: error.message });
		console.log('invalid');
	}
};

const profile = async (req, res) => {
	console.log('profile...');
};

export {
	register,
	auth,
	confirm,
	forgotPassword,
	checkToken,
	newPassword,
	profile
};