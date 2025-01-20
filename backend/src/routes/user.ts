import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { signupSchema, signinSchema } from "@abdul1mannan/inkspace-common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signupSchema.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid Input" }, 400);
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user) {
    return c.json({ error: "User already exists" }, 409);
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({
      token: token,
    });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signinSchema.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid Inputs" }, 400);
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return c.json({ error: "User not found" }, 400);
    }
    if (user.password !== body.password) {
      return c.json({ error: "Invalid password" }, 400);
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});
