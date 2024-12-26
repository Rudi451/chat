import HttpError from '../helpers/HttpError.js';

export const isLogged = (req, es, next) => {
	if (req.session && req.session.logged === true) {
		next();
	} else {
		next(new HttpError('Error: You are not logged', 402));
	}
};
