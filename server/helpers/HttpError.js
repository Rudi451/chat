export default class HttpError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;

		// Behalte den Stack-Trace für die ursprüngliche Fehlerstelle
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError);
		}
	}
}
