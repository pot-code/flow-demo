import { rest } from "msw"

export const handlers = [
  rest.post("/mock/flow/graph", (_, res, ctx) =>
    res(
      ctx.json({
        code: 200,
        msg: null,
      }),
    ),
  ),
  rest.get("/mock/flow/graph/1", (_, res, ctx) =>
    res(
      ctx.json({
        code: 200,
        msg: null,
        data: {
          nodes: [
            { id: "1", type: "number", position: { x: 0, y: 0 }, data: { value: 3 } },
            { id: "2", type: "number", position: { x: 0, y: 150 }, data: { value: 4 } },
            { id: "3", type: "multiple", position: { x: 300, y: 0 }, data: { op1: 3, op2: 4, value: 12 } },
            { id: "4", type: "result", position: { x: 600, y: 100 }, data: { value: 12 } },
          ],
          edges: [
            {
              id: "e1-3",
              source: "1",
              target: "3",
              sourceHandle: "value",
              targetHandle: "op1",
            },
            {
              id: "e2-3",
              source: "2",
              target: "3",
              sourceHandle: "value",
              targetHandle: "op2",
            },
            {
              id: "e3-4",
              source: "3",
              target: "4",
              sourceHandle: "value",
              targetHandle: "value",
            },
          ],
        },
      }),
    ),
  ),
]
