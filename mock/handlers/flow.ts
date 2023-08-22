import { rest } from "msw"

export const handlers = [
  rest.post("/mock/flow", (_, res, ctx) =>
    res(
      ctx.json({
        code: 200,
        msg: null,
        total: 10,
        data: [
          {
            id: "1679274506000",
            name: "Carol-jean",
            owner_id: "1684186998000",
            created_at: "2023-02-01T19:32:54Z",
          },
          {
            id: "1684426667000",
            name: "Antonietta",
            owner_id: "1666264793000",
            created_at: "2023-03-11T10:20:53Z",
          },
          {
            id: "1672247658000",
            name: "Daffy",
            owner_id: "1689148164000",
            created_at: "2023-03-05T05:25:45Z",
          },
          {
            id: "1677931366000",
            name: "Gram",
            owner_id: "1684790891000",
            created_at: "2023-03-18T20:55:04Z",
          },
          {
            id: "1686400851000",
            name: "Marcella",
            owner_id: "1680468115000",
            created_at: "2022-10-27T22:36:49Z",
          },
          {
            id: "1676431936000",
            name: "Matthus",
            owner_id: "1673451767000",
            created_at: "2022-11-11T05:31:05Z",
          },
          {
            id: "1691025201000",
            name: "Jocelyn",
            owner_id: "1678402936000",
            created_at: "2022-09-03T07:54:12Z",
          },
          {
            id: "1671790673000",
            name: "Sawyer",
            owner_id: "1688683375000",
            created_at: "2023-08-18T21:49:32Z",
          },
          {
            id: "1677440047000",
            name: "Wildon",
            owner_id: "1675396116000",
            created_at: "2023-01-07T02:12:27Z",
          },
          {
            id: "1673540793000",
            name: "Franciskus",
            owner_id: "1672046996000",
            created_at: "2022-10-06T10:02:52Z",
          },
        ],
      }),
    ),
  ),
  rest.get("/mock/flow/1", (_, res, ctx) =>
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
