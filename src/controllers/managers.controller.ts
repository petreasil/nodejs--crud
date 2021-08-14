import * as admin from "firebase-admin";
import { Manager } from "../models/manger.model";
export class ManagersController {
  db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async getAll(): Promise<Manager[]> {
    const managers = await this.db.collection("managers").get();
    return managers.docs.map((item) => new Manager(item.data()));
  }

  async getid(id: number): Promise<Manager> {
    const res = await this.db
      .collection("managers")
      .where("id", "==", id)
      .get();

    return res.docs.map((doc) => new Manager(doc.data()))[0];
  }

  async add(user: Manager): Promise<Manager> {
    const jsonstring = JSON.stringify(user);
    const ref = await this.db
      .collection("managers")
      .add(JSON.parse(jsonstring));
    const manager = await this.db.collection("managers").doc(ref.id).get();

    return new Manager(manager.data());
  }
}
