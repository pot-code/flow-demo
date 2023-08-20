import React from "react"
import { RouteObject } from "react-router-dom"
import Login from "@/views/login"
import FlowEditor from "../views/flow/editor"

export const routes: RouteObject[] = [
  {
    path: "/flow/:flowId",
    element: React.createElement(FlowEditor),
  },
  {
    path: "/login",
    element: React.createElement(Login),
  },
]
