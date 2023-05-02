import { z } from 'zod'

export const CNBCIndonesiaSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    link: z.string().url(),
    image: z.string().url(),
    label: z.string(),
    date: z.string()
})
export type CNBCIndonesia = z.infer<typeof CNBCIndonesiaSchema>

export const AntaraNewsSchema = z.object({
    title: z.string(),
    link: z.string().url(),
    image: z.string().url(),
    label: z.string(),
    date: z.string()
});
export type AntaraNews = z.infer<typeof AntaraNewsSchema>

export const KompasSchema = z.object({
    title: z.string(),
    link: z.string().url(),
    image: z.string().url(),
    label: z.string(),
    date: z.string()
});
export type Kompas = z.infer<typeof KompasSchema>

export const SuaracomSchema = z.object({
    title: z.string(),
    link: z.string().url(),
    image: z.string().url(),
    description: z.string(),
    date: z.string()
});
export type Suaracom = z.infer<typeof SuaracomSchema>

export const Liputan6Schema = z.object({
    title: z.string(),
    link: z.string().url(),
    image: z.string().url(),
    description: z.string(),
    label: z.string(),
    date: z.string()
});
export type Liputan6 = z.infer<typeof Liputan6Schema>

export const MerdekaSchema = z.object({
    title: z.string(),
    link: z.string().url(),
    image: z.string().url(),
    label: z.string(),
    date: z.string()
});
export type Merdeka = z.infer<typeof MerdekaSchema>
