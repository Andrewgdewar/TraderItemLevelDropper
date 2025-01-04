import { DependencyContainer } from "tsyringe";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import config from "../../config/config.json";

export const ItemChanger = (container: DependencyContainer): undefined => {
  const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
  const tables = databaseServer.getTables();
  const changeList = new Set(config.list);

  for (const key in tables.traders) {
    const trader = tables.traders[key];
    if (trader.assort) {
      trader.assort.items.forEach(({ parentId, _tpl, _id }) => {
        if (
          changeList.has(_tpl) &&
          parentId === "hideout" &&
          tables.traders[key].assort.loyal_level_items[_id] > 1
        ) {
          // console.log(_tpl)
          tables.traders[key].assort.loyal_level_items[_id] =
            tables.traders[key].assort.loyal_level_items[_id] - 1;
        }
      });
    }
  }
};
