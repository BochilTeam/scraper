import { it } from 'node:test'
import assert from 'node:assert'
import {
  wikipedia,
} from '../index.js'


it('Wikipedia', async () => {
  const data = await wikipedia('Minecraft', 'en')
  assert.ok(data.articles.length > 1)
})