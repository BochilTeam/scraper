import { z } from 'zod'

export const ArtiMimpiSchema = z.string()
export type ArtiMimpi = z.infer<typeof ArtiMimpiSchema>

export const ArtiNamaSchema = z.string()
export type ArtiNama = z.infer<typeof ArtiNamaSchema>

export const NomerHokiSchema = z.object({
	nomer: z.union([z.string(), z.number()]),
	angka_bagua_shuzi: z.number(),
	positif: z.object({
		kekayaan: z.number(),
		kesehatan: z.number(),
		cinta: z.number(),
		kestabilan: z.number(),
		positif: z.number(),
	}),
	negatif: z.object({
		perselisihan: z.number(),
		kehilangan: z.number(),
		malapetaka: z.number(),
		Kehancuran: z.number(),
		negatif: z.number(),
	}),
})
export type NomerHoki = z.infer<typeof NomerHokiSchema>

export const ZodiacSchema = z.enum([
	'capricorn',
	'aquarius',
	'pisces',
	'aries',
	'taurus',
	'gemini',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagitarius',
]);
export type Zodiac = z.infer<typeof ZodiacSchema>
