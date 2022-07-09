import similarity from 'similarity'
import {
  DidYouMean,
  DidYouMeanArgsSchema,
  DidYouMeanSchema
} from './types.js'

export default function didyoumean (query: string, list: string[], opts: { threshold: number, opts?: Parameters<typeof similarity>[2] } = { threshold: 0.7 }): DidYouMean[] {
  DidYouMeanArgsSchema.parse(arguments)

  const results: DidYouMean[] = []
  for (const index in list) {
    const item = list[index]
    const score = similarity(query, item)
    if (similarity(query, item, opts.opts) >= opts.threshold) {
      results.push({ index: parseInt(index), query: item, score })
    }
  }
  const sortByHigest = results.sort((a, b) => b.score - a.score)
  return sortByHigest.map(item => DidYouMeanSchema.parse(item))
}
