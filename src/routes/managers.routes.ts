import { validateOrReject } from "class-validator";
import { Manager } from "../models/manger.model";
import { ManagersController } from "../controllers/managers.controller";

export class ManagersRoutes {
  managerscontroller = new ManagersController();

  routes(app): void {
    app.get("/managers", async (req, res) => {
      const managers = await this.managerscontroller.getAll();
      res.send(managers);
    });

    app.get("/managers/:id", async (req, res) => {
      const id = +req.params.id;
      const singleManager = await this.managerscontroller.getid(id);
      if (singleManager) {
        res.send(singleManager);
      } else {
        res.status(404).send("user not found");
      }
    });
    app.post("/managers", async (req, res) => {
      const body = req.body;
      const manager = new Manager(body);
      try {
        await validateOrReject(manager);
        this.managerscontroller.add(manager);
        res.send("Manger Added");
      } catch (err) {
        res.send(err);
      }
    });
  }
}
