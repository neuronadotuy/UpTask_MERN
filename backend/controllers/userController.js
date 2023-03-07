import User from '../model/User.js';
import genId from '../helpers/genid.js';

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
	if (!user.confirmed) {
		const error = new Error('User not confirmed');
		return res.status(403).json({ msg: error.message });
	};

	// check password
	if (await user.checkPassword(password)) {
		// make an object to prevent user information leak
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email
		})
	} else {
		const error = new Error('Wrong user or password');
		return res.status(403).json({ msg: error.message });
	};
};

export {
	register,
	auth,
};