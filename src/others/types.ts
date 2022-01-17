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