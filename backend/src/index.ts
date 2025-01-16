import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("*", cors());

//middleware for authentication
app.use("/api/v1/blog/*", async (c, next) => {
  const token = c.req.header("authorization")?.split(" ")[1];
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const response = await verify(token, c.env.JWT_SECRET);
  if (response.id) {
    c.set("userId", String(response.id));
    await next();
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  if (!body.email || !body.name || !body.password) {
    return c.json({ error: "Invalid request" }, 400);
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user) {
    return c.json({ error: "User already exists" }, 400);
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });
  const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
  });
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  if (!body.email || !body.password) {
    return c.json({ error: "Invalid request" }, 400);
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    return c.json({ error: "User not found" }, 400);
  }
  if (user.password !== body.password) {
    return c.json({ error: "Invalid password" }, 400);
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});

app.get("/api/v1/blog/:id", async (c) => {
  return c.json({ message: "Hello World" });
});

app.post("/api/v1/blog", async (c) => {
  return c.json({ message: "Hello World" });
});
app.put("/api/v1/blog/:id", async (c) => {
  return c.json({ message: "Hello World" });
});
export default app;
