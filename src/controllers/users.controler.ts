import { UserModel } from "../models/user.model";
import * as admin from "firebase-admin";

export class UsersController {
  db;
  users: UserModel[] = [];

  constructor() {
    this.db = admin.firestore();
  }

  async getAll(): Promise<UserModel[]> {
    const refs = await this.db.collection("users").get();
    return refs.docs.map((doc) => new UserModel(doc.data()));
  }

  async get(id: number): Promise<UserModel> {
    const ref = await this.db.collection("users").doc(id).get();
    return new UserModel(ref.data());
  }

  async add(user: UserModel): Promise<void> {
    const jsonstring = JSON.stringify(user);
    console.log(jsonstring);
    await this.db.collection("users").add(JSON.parse(jsonstring));
  }
}
