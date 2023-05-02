import { z } from 'zod'

export const AsahOtakSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
})
export type AsahOtak = z.infer<typeof AsahOtakSchema>

export const CakLontongSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string(),
    deskripsi: z.string()
})
export type CakLontong = z.infer<typeof CakLontongSchema>

export const Family100Schema = z.object({
    soal: z.string(),
    jawaban: z.array(z.string())
})
export type Family100 = z.infer<typeof Family100Schema>

export const SiapakahAkuSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
})
export type SiapakahAku = z.infer<typeof SiapakahAkuSchema>

export const SusunKataSchema = z.object({
    index: z.number(),
    soal: z.string(),
    tipe: z.string(),
    jawaban: z.string()
})
export type SusunKata = z.infer<typeof SusunKataSchema>

export const TebakBenderaSchema = z.object({
    flag: z.string(),
    img: z.string(),
    name: z.string()
})
export type TebakBendera = z.infer<typeof TebakBenderaSchema>

export const TebakGambarSchema = z.object({
    index: z.number(),
    img: z.string(),
    jawaban: z.string(),
    deskripsi: z.string()
})
export type TebakGambar = z.infer<typeof TebakGambarSchema>

export const TebakKabupatenSchema = z.object({
    index: z.number(),
    title: z.string(),
    url: z.string()
})
export type TebakKabupaten = z.infer<typeof TebakKabupatenSchema>

export const TebakKataSchema = z.object({
    index: z.number(),
    soal: z.string(),
    jawaban: z.string()
})
export type TebakKata = z.infer<typeof TebakKataSchema>

export const TebakKimiaSchema = z.object({
    unsur: z.string(),
    lambang: z.string()
})
export type TebakKimia = z.infer<typeof TebakKimiaSchema>

export const TebakLirikSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
})
export type TebakLirik = z.infer<typeof TebakLirikSchema>

export const TebakTebakanSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
})
export type TebakTebakan = z.infer<typeof TebakTebakanSchema>

export const TekaTekiSchema = z.object({
    soal: z.string(),
    jawaban: z.string()
})
export type TekaTeki = z.infer<typeof TekaTekiSchema>
