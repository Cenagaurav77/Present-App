import dbConnect from '@/server/lib/dbConnect'
import Presentation from '@/server/models/Presentation'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { pid },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const userPresentation = await Presentation.findOne({ _id: pid })
      res.status(200).json({ success: true, body: userPresentation })

      break
    case 'DELETE':
      const deletedPresentation = await Presentation.deleteOne({ _id: pid })
      res
        .status(200)
        .json({ success: true, body: deletedPresentation, error: null })

      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
