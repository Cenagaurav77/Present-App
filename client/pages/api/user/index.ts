import dbConnect from '@/server/lib/dbConnect'
import User from '@/server/models/User'
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
      const users = await User.find({}) // should find user with an id only
      res.status(200).json({ success: true, body: users })

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
