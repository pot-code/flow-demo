import React from "react"
import { RouteObject } from "react-router-dom"
import Login from "@/views/login"
import Dashboard from "@/views/dashboard"
import FlowEditor from "@/views/flow/editor"
import RouteGuard from "@/features/auth/route-guard"
import Home from "@/views/home"

export const routes: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: React.createElement(Home),
  },
  {
    path: "/flow/:flowId",
    element: React.createElement(RouteGuard, null, React.createElement(FlowEditor)),
  },
  {
    path: "/dashboard",
    element: React.createElement(RouteGuard, null, React.createElement(Dashboard)),
  },
  {
    path: "/login",
    element: React.createElement(Login),
  },
]
