import { validateOrReject } from "class-validator";
import { UsersController } from "../controllers/users.controler";
import { UserModel } from "../models/user.model";

export class UserRoutes {
  userControler = new UsersController();

  constructor() {}
  routes(app) {
    app.get("/:id", async (req, res) => {
      const id = parseInt(req.params.id, 10);
      const user = await this.userControler.get(id);
      res.json(user);
    });

    app.get("/", async (req, res) => {
      const users = await this.userControler.getAll();
      res.json(users);
    });

    app.post("/", async (req, res) => {
      const body = req.body;
      const user = new UserModel(body);

      try {
        await validateOrReject(user);
        this.userControler.add(user);
        res.send("User Added");
      } catch (err) {
        res.send(err);
      }
    });
  }
}
