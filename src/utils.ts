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


export function decodeSnapApp(...args: string[] | number[]): string {
	// From reponse snap app
	function _0xe78c(
		d: string,
		e: number,
		f: number
	): string {
		var g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("")
		var h = g.slice(0, e)
		var i = g.slice(0, f)
		var j = d.split("").reverse().reduce(function (a, b, c) {
			if (h.indexOf(b) !== -1) return a += h.indexOf(b) * (Math.pow(e, c))
		}, 0)
		var k = "";
		while (j > 0) {
			k = i[j % f] + k;
			j = (j - (j % f)) / f
		}
		return k || "0"
	}

	function _0xc60e(
		h: string,
		u: unknown,
		n: string,
		t: number,
		e: string,
		r: string
	) {
		r = "";
		for (var i = 0, len = h.length; i < len; i++) {
			var s = ""
			while (h[i] !== n[e]) {
				s += h[i];
				i++
			}
			for (var j = 0; j < n.length; j++)
				// @ts-ignore
				s = s.replace(new RegExp(n[j], "g"), j);
			// @ts-ignore
			r += String.fromCharCode((_0xe78c(s, e, 10) - t) as number[])
		}
		return decodeURIComponent(encodeURIComponent(r))
	}
	// @ts-ignore
	return _0xc60e(...args)
}
