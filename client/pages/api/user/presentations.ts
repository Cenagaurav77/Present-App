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
    case 'POST':
      const { user_uid, pages, name } = body

      const dbData = new Presentation({
        user_uid,
        pages,
        name,
      })

      try {
        await dbData.save()
        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
