import React from "react"
import { RouteObject } from "react-router-dom"
import FlowEditor from "../views/flow/editor"

export const routes: RouteObject[] = [
  {
    path: "/flow/:flowId",
    element: React.createElement(FlowEditor),
  },
]
