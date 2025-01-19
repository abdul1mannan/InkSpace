import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogSchema, updateBlogSchema } from "@abdul1mannan/inkspace-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.split(" ")[1];

  
  const response = await verify(token, c.env.JWT_SECRET);
  if (response) {
    c.set("userId", String(response.id));
    await next();
  } else {
    return c.redirect("/login");
  }
});

blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const {success} = createBlogSchema.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid Inputs" }, 400);
  }   
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        authorId: userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

blogRouter.put("/update/:id", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const {success} = updateBlogSchema.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid Inputs" }, 400);
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.update({
      where: { id: c.req.param("id") },
      data: {
        title: body?.title,
        content: body?.content,
        authorId: userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

blogRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: { id: c.req.param("id") },
    });
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({
      post,
    });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});


//pagination?

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();
    return c.json({ posts });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});
