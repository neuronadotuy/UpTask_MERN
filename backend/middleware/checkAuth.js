const checkAuth = (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
	
		try {
			token = req.headers.authorization;
			console.log(token);
		} catch (error) {
			console.log(error);
		}
	}

	next();
};

export default checkAuth;