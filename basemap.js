import config from "./config"
import {
  XYZ,
} from "ol/source";
import {
  Tile
} from "ol/layer";

const BASEMAP =   config.BASEMAP.map(item  => {
  return  new Tile({
    source: new XYZ({
      url:item
    }),

  });
})

export default BASEMAP