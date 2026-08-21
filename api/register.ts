import type { VercelRequest, VercelResponse } from '@vercel/node'

const DIRECTUS_URL = 'https://burnes-center.directus.app'

const COLLECTION = 'cw_intake'


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

  /* Re-checked fields */
  const missing = ['email', 'first_name', 'last_name', 'country'].filter(
    (field) => !body[field],
  )

  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(', ')}` })
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
