import { z } from 'zod'

export const LatinToAksaraSchema = z.string()
export const AksaraToLatinSchema = z.string()
export type LatinToAksara = z.infer<typeof LatinToAksaraSchema>
export type AksaraToLatin = z.infer<typeof AksaraToLatinSchema>

export const BucinSchema = z.string()
export type Bucin = z.infer<typeof BucinSchema>

export const DareSchema = z.string()
export type Dare = z.infer<typeof DareSchema>

export const TruthSchema = z.string()
export type Truth = z.infer<typeof TruthSchema>

export const TextProListSchema = z.object({
    link: z.string(),
    title: z.string(),
    parameters: z.array(z.boolean())
})
export const TextProSchema = z.string()
export type TextProList = z.infer<typeof TextProListSchema>
export type TextPro = z.infer<typeof TextProSchema>