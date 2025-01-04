/* eslint-disable @typescript-eslint/naming-convention */
import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { enable } from "../config/config.json";
import { ItemChanger } from "./Changer/SetupLocationGlobals";

class TraderItemLevelDropper implements IPostDBLoadMod {
  postDBLoad(container: DependencyContainer): void {
    if (enable) {
      try {
        ItemChanger(container);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}

module.exports = { mod: new TraderItemLevelDropper() };
