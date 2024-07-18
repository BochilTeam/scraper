import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
    asahotak, asahotakjson,
    caklontong, caklontongjson,
    family100, family100json,
    siapakahaku, siapakahakujson,
    susunkata, susunkatajson,
    tebakbendera, tebakbenderajson,
    tebakgambar, tebakgambarjson,
    tebakkabupaten, tebakkabupatenjson,
    tebakkata, tebakkatajson,
    tebakkimia, tebakkimiajson,
    tebaklirik, tebaklirikjson,
    tebaktebakan, tebaktebakanjson,
    tekateki, tekatekijson
} from '../index.js'
import {
    AsahOtakSchema,
    CakLontongSchema,
    Family100Schema,
    SiapakahAkuSchema,
    SusunKataSchema,
    TebakBenderaSchema,
    TebakGambarSchema,
    TebakKabupatenSchema,
    TebakKataSchema,
    TebakKimiaSchema,
    TebakLirikSchema,
    TebakTebakanSchema,
    TekaTekiSchema
} from '../types/index.js'

describe('Games', () => {
    describe('Asah Otak', () => {
        it('Asah Otak', async () => {
            const data = await asahotak()
            assert.ok(data)
        })

        it('Asah Otak JSON', () => {
            assert.ok(asahotakjson.length > 1)
            asahotakjson.map((value) => {
                const parsed = AsahOtakSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })

    describe('Caklontong', () => {
        it('Caklontong', async () => {
            const data = await caklontong()
            assert.ok(data)
        })

        it('Caklontong JSON', () => {
            assert.ok(caklontongjson.length > 1)
            caklontongjson.map((value) => {
                const parsed = CakLontongSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })

    describe('Family100', () => {
        it('Family100', async () => {
            const data = await family100()
            assert.ok(data)
        })

        it('Family100 JSON', () => {
            assert.ok(family100json.length > 1)
            family100json.map((value) => {
                const parsed = Family100Schema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })

    describe('Siapakah Aku', () => {
        it('Siapakah Aku', async () => {
            const data = await siapakahaku()
            assert.ok(data)
        })

        it('Siapakah Aku JSON', () => {
            assert.ok(siapakahakujson.length > 1)
            siapakahakujson.map((value) => {
                const parsed = SiapakahAkuSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })

    describe('Susun Kata', () => {
        it('Susun Kata', async () => {
            const data = await susunkata()
            assert.ok(data)
        })

        it('Susun Kata JSON', () => {
            assert.ok(susunkatajson.length > 1)
            susunkatajson.map((value) => {
                const parsed = SusunKataSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })

    describe('Tebak Bendera', () => {
        it('Tebak Bendera', async () => {
            const data = await tebakbendera()
            assert.ok(data)
        })
    
        it('Tebak Bendera JSON', () => {
            assert.ok(tebakbenderajson.length > 1)
            tebakbenderajson.map((value) => {
                const parsed = TebakBenderaSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Tebak Gambar', () => {
        it('Tebak Gambar', async () => {
            const data = await tebakgambar()
            assert.ok(data)
        })
    
        it('Tebak Gambar JSON', () => {
            assert.ok(tebakgambarjson.length > 1)
            tebakgambarjson.map((value) => {
                const parsed = TebakGambarSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Tebak Kabupaten', () => {
        it('Tebak Kabupaten', async () => {
            const data = await tebakkabupaten()
            assert.ok(data)
        })
    
        it('Tebak Kabupaten JSON', () => {
            assert.ok(tebakkabupatenjson.length > 1)
            tebakkabupatenjson.map((value) => {
                const parsed = TebakKabupatenSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Tebak Kata', () => {
        it('Tebak Kata', async () => {
            const data = await tebakkata()
            assert.ok(data)
        })
    
        it('Tebak Kata JSON', () => {
            assert.ok(tebakkatajson.length > 1)
            tebakkatajson.map((value) => {
                const parsed = TebakKataSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Tebak Kimia', () => {
        it('Tebak Kimia', async () => {
            const data = await tebakkimia()
            assert.ok(data)
        })
    
        it('Tebak Kimia JSON', () => {
            assert.ok(tebakkimiajson.length > 1)
            tebakkimiajson.map((value) => {
                const parsed = TebakKimiaSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Tebak Lirik', () => {
        it('Tebak Lirik', async () => {
            const data = await tebaklirik()
            assert.ok(data)
        })
    
        it('Tebak Lirik JSON', () => {
            assert.ok(tebaklirikjson.length > 1)
            tebaklirikjson.map((value) => {
                const parsed = TebakLirikSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    

    describe('Tebak-tebakan', () => {
        it('Tebak-tebakan', async () => {
            const data = await tebaktebakan()
            assert.ok(data)
        })
    
        it('Tebak-tebakan JSON', () => {
            assert.ok(tebaktebakanjson.length > 0)
            tebaktebakanjson.forEach((value) => {
                const parsed = TebakTebakanSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
    describe('Teka-teki', () => {
        it('Teka-teki', async () => {
            const data = await tekateki()
            assert.ok(data)
        })
    
        it('Teka-teki JSON', () => {
            assert.ok(tekatekijson.length > 0)
            tekatekijson.forEach((value) => {
                const parsed = TekaTekiSchema.safeParse(value)
                assert.ok(parsed.success)
            })
        })
    })
    
})