export interface Wikipedia {
	title: string;
	img: string;
	articles: string;
}

interface ResultsJadwalTV {
	date: string;
	event: string
}
export interface JadwalTV {
	channel: string;
	result: ResultsJadwalTV[];
}
export interface JadwalTVNOW {
	[Key: string]: ResultsJadwalTV[]
}

export interface Mediafire {
	url: string;
	url2: string;
	filename: string;
	aploud: string;
	filesizeH: string;
	filesize: number

}

export interface Gempa {
	date: string;
	locate: string;
	magnitude: string;
	depth: string;
	location: string;
	warning: string[];
}

export interface GempaNow {
	date: string;
	latitude: string;
	longitude: string;
	magnitude: string;
	depth: string;
	location: string;
}

export interface Tsunami {
	date: string;
	locate: string;
	magnitude: string;
	depth: string;
	location: string;
}