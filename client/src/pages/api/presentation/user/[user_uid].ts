import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/server/lib/dbConnect'
import Presentation from '@/server/models/Presentation'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_uid } = req.query

  const {
    query: { id },
    method,
    body,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const userPresentations = await Presentation.find({ user_uid })
      res.status(200).json({ success: true, body: userPresentations })

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
