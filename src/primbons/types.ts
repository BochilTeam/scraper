export interface NomerHoki {
	nomer: number | string;
	angka_bagua_shuzi: number;
	positif: {
		kekayaan: number;
		kesehatan: number;
		cinta: number;
		kestabilan: number;
		positif: number;
	};
	negatif: {
		perselisihan: number;
		kehilangan: number;
		malapetaka: number;
		Kehancuran: number;
		negatif: number;
	};
}

export type Zodiac =
	| 'capricorn'
	| 'aquarius'
	| 'pisces'
	| 'aries'
	| 'taurus'
	| 'gemini'
	| 'cancer'
	| 'leo'
	| 'virgo'
	| 'libra'
	| 'scorpio'
	| 'sagitarius';
