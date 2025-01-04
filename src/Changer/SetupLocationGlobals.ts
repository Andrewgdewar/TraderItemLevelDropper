import { DependencyContainer } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
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
          if (config.debug) {
            console.log(
              "Updating a reference to",
              config.listEnglish[config.list.findIndex((id) => _tpl === id)],
              _id
            );
          }
          tables.traders[key].assort.loyal_level_items[_id] =
            tables.traders[key].assort.loyal_level_items[_id] - 1;
        }
      });
    }
  }
};
