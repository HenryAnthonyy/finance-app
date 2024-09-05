import { Hono } from "hono";
import { handle } from "hono/vercel";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

import accounts from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.get("/hello", clerkMiddleware(), (c) => {
//   const auth = getAuth(c);

//   if (!auth?.userId) {
//     return c.json({
//       error: "Unathorized, You are not logged in",
//     });
//   }

//   return c.json({
//     message: "Hello World!",
//     userId: auth.userId,
//   });
// });

//error handling
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Error" });
});

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

//RPC
export type AppType = typeof routes;
