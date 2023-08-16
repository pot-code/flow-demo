import { rest } from "msw"

export const handlers = [
  rest.post("/api/flow/graph", (_, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.json({
        code: 200,
        msg: null,
      }),
    ),
  ),
]
