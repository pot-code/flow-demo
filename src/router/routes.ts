import React from "react"
import { RouteObject } from "react-router-dom"
import Login from "@/views/login"
import FlowEditor from "../views/flow/editor"
import Dashboard from "@/views/flow/dashboard"

export const routes: RouteObject[] = [
  {
    path: "/flow/:flowId",
    element: React.createElement(FlowEditor),
  },
  {
    path: "/flow/dashboard",
    element: React.createElement(Dashboard),
  },
  {
    path: "/login",
    element: React.createElement(Login),
  },
]
