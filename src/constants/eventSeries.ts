import type { EventSeries } from '../App.types'


const ASSET_BASE = 'https://directus.theburnescenter.org/assets'

const asset = (id: string) => `${ASSET_BASE}/${id}?width=50`

export const EVENT_SERIES: EventSeries[] = [
  {
    id: 'series-60',
    title: 'Practical Approaches to Evaluating AI for Public Benefit',
    imageUrl: asset('55e9b688-fdda-42b5-8f4e-760686a76d17'),
  },
  {
    id: 'series-69',
    title: 'AI, Energy, and the Environment: Use, Policy, and Tradeoffs',
    imageUrl: asset('81f453b6-e750-4a10-9470-5563de605447'),
  },
  {
    id: 'series-62',
    title: 'AI for Public-Sector Procurement',
    imageUrl: asset('a7d1642b-de9a-4cfd-9e4d-2ba308769ca0'),
  },
  {
    id: 'series-45',
    title:
      'Democratic and Public AI: Practical Strategies for Buying, Building, and Governing AI',
    imageUrl: asset('f9e1bf61-6006-40d6-aed6-a33c61e83b04'),
  },
  {
    id: 'series-64',
    title: 'AI in Public Health',
    imageUrl: asset('72d4a7d2-8b8e-42ac-a3f7-fe32ac960c2b'),
  },
  {
    id: 'series-65',
    title: 'The Good, the Bad and the Ugly of Predictive AI',
    imageUrl: asset('d802e5c6-4fe8-4761-9c95-e1c88c277a88'),
  },
  {
    id: 'series-66',
    title: 'Using AI in Public Sector Legal Practice',
    imageUrl: asset('ca81f152-9baa-48b0-91a1-18acce55eaea'),
  },
  {
    id: 'series-68',
    title: 'Worker-Centered AI Adoption in the Public Sector',
    imageUrl: asset('1cb29c6c-7d8a-439b-96e3-00d8d778c3e2'),
  },
  {
    id: 'series-104',
    title: 'AI Insourcing and the Government Product Model',
    imageUrl: asset('c9f7f88e-3edf-437e-81f6-20f8638a05b8'),
  },
  {
    id: 'series-38',
    title: 'Amplify: Mastering Public Communication in the AI Age',
    imageUrl: asset('595ed67c-7071-45e0-b26a-6518252d79a0'),
  },
  {
    id: 'series-63',
    title:
      'Working with AI Agents in the Public Sector: What Works (and What Doesn’t)',
    imageUrl: asset('ff664fe2-1f1f-440b-ac60-b93662b4cc07'),
  },
  {
    id: 'series-70',
    title: 'AI for Public HR Professionals',
    imageUrl: asset('8b6a0119-64d4-4bee-85b4-50cb82e084f4'),
  },
  {
    id: 'series-71',
    title: 'AI and Cybersecurity in the Public Sector for the Non-Expert',
    imageUrl: asset('674a363b-f9a1-4da8-811e-e3653a0dcdd0'),
  },
  {
    id: 'series-40',
    title: 'The Prompting Lab: Real Prompts, Real Challenges, All Platforms',
    imageUrl: asset('dedd4a1e-fe11-4230-8635-8eaeda8e42f7'),
  },
]
