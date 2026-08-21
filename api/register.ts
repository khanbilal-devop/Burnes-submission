import type { VercelRequest, VercelResponse } from '@vercel/node'

const DIRECTUS_URL = 'https://burnes-center.directus.app'

const COLLECTION = 'cw_intake'

const EMAIL_PATTERN = /^[^\s@.]+(\.[^\s@.]+)*@[^\s@.]+(\.[^\s@.]+)+$/
const NAME_PATTERN = /^[\p{L}\s'’.-]+$/u

const asText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''


const buildRecord = (body: Record<string, unknown>) => ({
  email: body.email,
  first_name: body.first_name,
  last_name: body.last_name,
  country: body.country,
  gov_org: body.gov_org ?? null,
  gov_level: body.gov_level ?? null,
  state: body.state ?? null,
  workshop_series: body.workshop_series ?? null,
  newsletter: body.newsletter ?? false,
  consent_at: body.consent_at ?? null,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.DIRECTUS_TOKEN

  if (!token) {
    console.error('DIRECTUS_TOKEN is not set')
    return res.status(500).json({ error: 'Server is not configured' })
  }

  const body = (req.body ?? {}) as Record<string, unknown>

  /*
   * This list mirrors the NOT NULL columns in cw_intake.
   */
  const missing = [
    'email',
    'first_name',
    'last_name',
    'country',
    'gov_org',
  ].filter((field) => !body[field])


  if (typeof body.newsletter !== 'boolean') {
    missing.push('newsletter')
  }


  const series =
    typeof body.workshop_series === 'string' ? body.workshop_series.trim() : ''

  if (series === '' || series === '[]') {
    missing.push('workshop_series')
  }

  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(', ')}` })
  }

  const invalid: string[] = []

  if (!EMAIL_PATTERN.test(asText(body.email))) invalid.push('email')
  if (!NAME_PATTERN.test(asText(body.first_name))) invalid.push('first_name')
  if (!NAME_PATTERN.test(asText(body.last_name))) invalid.push('last_name')
  if (!NAME_PATTERN.test(asText(body.country))) invalid.push('country')

  let seriesIds: unknown
  try {
    seriesIds = JSON.parse(series)
  } catch {
    seriesIds = null
  }

  if (!Array.isArray(seriesIds) || seriesIds.length === 0) {
    invalid.push('workshop_series')
  }

  if (invalid.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid fields: ${invalid.join(', ')}` })
  }

  try {
    const response = await fetch(`${DIRECTUS_URL}/items/${COLLECTION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buildRecord(body)),
    })

    if (!response.ok) {
      console.error(
        'Directus rejected the write',
        response.status,
        await response.text(),
      )
      return res.status(502).json({ error: 'Could not save the registration' })
    }

    const created = (await response.json()) as { data?: { id?: unknown } }

    return res.status(201).json({ id: created.data?.id ?? null })
  } catch (error) {
    console.error('Directus request failed', error)
    return res.status(502).json({ error: 'Could not save the registration' })
  }
}
