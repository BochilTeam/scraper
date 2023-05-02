import { describe, it } from 'mocha'
import { 
    gempa,
    gempaNow,
    gempaRealtime
} from '../src/index.js'

describe('BMKG', () => {
    describe('Gempabumi', () => {
        it('Gempa dirasakan', (done) => {
            gempa().then(() => {

                return done()
            }).catch(done)
        })

        it('Gempabumi Terkini (M ≥ 5.0)', (done) => {
            gempaNow().then(() => {

                return done()
            }).catch(done)
        })
        
        it('Gempabumi realtime', (done) => {
            gempaRealtime().then(() => {

                return done()
            }).catch(done)
        })
    })
})