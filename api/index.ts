import express, {json} from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


export default {
  path: "/api",
  handler: app,
};

app.post("/check_user", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username) {
    const response = await prisma.user.findUnique({
      where: {
        name: username
      }
    });
    if (response && response.password === password) {
      res.json({auth: true});
    } else {
      res.json({auth: false, msg: "incorrect password"});
    }
  } else {
    res.json({auth: false, msg: "empty name"});
  }
});
