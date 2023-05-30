const apiKey = process.env.API_KEY;
const authenticateKey = (req, res, next) => {
	const api_key = req.header('x-api-key');
	if (apiKey == api_key) {
		//If API key matches
		next();
	} else {
		//Reject request if API key doesn't match
		res.status(403).send({
			error: { code: 403, message: 'Authentication Failed!' },
		});
	}
};

module.exports = authenticateKey;
