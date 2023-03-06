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

};

export {
	register,
	auth,
};