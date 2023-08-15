import { rest } from "msw"

export const handlers = [
  rest.get("/api/hello", (_, res, ctx) =>
    res(
      ctx.delay(500),
      ctx.json({
        code: 200,
        msg: null,
        data: "hello",
      }),
    ),
  ),
]
