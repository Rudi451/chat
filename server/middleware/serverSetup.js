import session from 'express-session';
import express, {Router} from 'express';

const router = new Router();

//_______________________________Start Variable Definition___________________________________________//
const sessionOptions = {
	secret: process.env.SECRET_KEY_SESSION_ID,

	resave: false,

	saveUninitialized: true,

	cookie: {
		secure: false,

		maxAge: 60 * 60 * 1000,
		expires: new Date(Date.now() + 3600000),
	},

	loggedIn: false,
};

// Session anrichten
router.use(session(sessionOptions));

export default router;
