import { z } from 'zod'


export const KodePosArgsSchema = z.object({
    0: z.string()
})

export const KodePosSchema = z.array(z.object({
    kodepos: z.string(),
    desa: z.string(),
    kecamatan: z.string(),
    kota: z.string(),
    provinsi: z.string(),
}))

export type KodePos = z.infer<typeof KodePosSchema>