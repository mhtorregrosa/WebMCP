import { describe, expect, it } from 'vitest'
import { visibleFeatureOptions } from '../src/App'

describe('agent-synchronized requirement controls', () => {
  it('reveals an active agent requirement that is not in the compact human defaults', () => {
    const options = visibleFeatureOptions(['seo'], ['sso'])

    expect(options.map((option) => option.id)).toContain('sso')
  })

  it('keeps inactive advanced requirements out of the compact form', () => {
    const options = visibleFeatureOptions(['seo'], [])

    expect(options.map((option) => option.id)).not.toContain('sso')
  })

  it('does not show requirements from an unselected category', () => {
    const options = visibleFeatureOptions(['hosting'], ['sso'])

    expect(options.map((option) => option.id)).not.toContain('sso')
  })
})
