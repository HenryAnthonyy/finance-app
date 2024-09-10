import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
  const authenticated = getAuth(c);

  if (!authenticated?.userId) {
    return c.json({ error: " Unauthorized access" }, 401); // add 401 status code to prevent error in data fetching in for example "user-get-account.ts"
  }

  // if (!authenticated?.userId) {
  //   throw new HTTPException(401, {
  //     res: c.json({ error: "Unauthorized access" }, 401),
  //   });
  // }

  //fetching from db with drizzle
  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)
    .where(eq(accounts.userId, authenticated.userId)); //accounts to be returned from only current user

  return c.json({ data });
})
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({
      name: true,
    })),
    async(c) => {
      const authenticated = getAuth(c)
      const values = c.req.valid("json")

      if(!authenticated?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: authenticated?.userId,
        ...values
      }).returning(); // concat returning to be able to return values from db.insert

      return c.json({data})
    }
  )

export default app;
