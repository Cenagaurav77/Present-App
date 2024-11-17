import dbConnect from '@/server/lib/dbConnect'
import Presentation from '@/server/models/Presentation'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
    body,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const presentations = await Presentation.find({})
      res.status(200).json({ success: true, body: presentations })

      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
