export class ScraperError extends Error {
	readonly date: Date;
	constructor(message: any, options?: {}) {
		super(message);
		this.name = "ScraperError";
		this.date = new Date();
		this.message =
			message +
			"\n\nIf this is bug pls report to https://github.com/BochilTeam/scraper";
	}
	static createError(message: any, options: {}): ScraperError {
		return new ScraperError(message, options);
	}
}
