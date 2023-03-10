import { getServerSession } from "next-auth";
import { z } from "zod";

import { prisma } from "../../../lib/prisma";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

import type { NextApiRequest, NextApiResponse } from 'next'
const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await Promise.all(
    intervals.map(
      async (interval) =>
        await prisma.userTimerInterval.create({
          data: {
            week_day: interval.weekDay,
            time_end_in_minutes: interval.endTimeInMinutes,
            time_start_in_minutes: interval.startTimeInMinutes,
            user_id: session.user?.id,
          },
        }),
    ),
  )

  return res.status(201).end()
}
