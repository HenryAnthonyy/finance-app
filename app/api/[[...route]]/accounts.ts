import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const authenticated = getAuth(c);

  // if (!authenticated?.userId) {
  //   return c.json({ error: " Unauthorized access" }, 401);
  // }

  if (!authenticated?.userId) {
    throw new HTTPException(401, {
      res: c.json({ error: "Unauthorized access" }, 401),
    });
  }
  //fetching from db with drizzle
  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)
    .where(eq(accounts.userId, authenticated.userId)); //accounts to be returned from only current user

  return c.json({ data });
});

export default app;
