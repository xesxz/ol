

/* openlayers加载arcgisxyz地图 */

/* asd */
import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {
  XYZ,
} from "ol/source";
import TileGrid from 'ol/tilegrid/TileGrid';

// 4326和4490相差很小，可以直接使用4236坐标系，不用注册4490(ol默认不支持4490)

const address = "成都"
const config  = address === "福州" ? {
  url:"https://ds.fzkcy.com/arcgis/rest/services/tilemap/%E5%BD%B1%E5%83%8F%E5%BA%95%E5%9B%BE%E6%B3%A8%E8%AE%B0_CGCS2000_2021/MapServer/tile/{z}/{y}/{x}",
  center:[119.306632,26.065371]
}  : {
  url:"https://api.cdmbc.cn:4432/gateway/gis/1/67b413ab746c47f5a1777dd68dbed6af/tile/{z}/{y}/{x}?AppKey=684855462427885568",
  center:[104.0818, 30.6551]
}


const map = new Map({
  target: 'map', layers: [], view: new View({
      projection: "EPSG:4326",
      // center: fromLonLat([103.22, 34.23]),
      center: config.center, // 默认显示中心点
      zoom: 12
  })
});


//分辨率
let resolutions = [0.7031250000000002, 0.3515625000000001, 0.17578125000000006, 0.08789062500000003,
  0.043945312500000014, 0.021972656250000007, 0.010986328125000003, 0.005493164062500002,
  0.002746582031250001, 0.0013732910156250004, 6.866455078125002E-4, 3.433227539062501E-4,
  1.7166137695312505E-4, 8.583068847656253E-5, 4.2915344238281264E-5, 2.1457672119140632E-5,
  1.0728836059570316E-5, 5.364418029785158E-6, 2.682209014892579E-6, 1.3411045074462895E-6,
];
var tilePileGrid = new TileGrid({
  // tileSize: 256, 默认为256
  origin: [ -180.0, 90.0],
  //extent可以不设置
  // extent: [102.89404546595003, 30.67289850037308, 104.99169156705003, 31.674598564056254],
  // extent: [118.72986776189057, 25.469593369308647, 119.9611444036561, 26.537459839481826],
  resolutions:resolutions,
  
});


const tile =  new TileLayer({
  source: new XYZ({
    url:config.url,
    tileGrid: tilePileGrid,
    // crossOrigin: 'anoymous',
    projection: "EPSG:4326",
  }),

});

map.addLayer(tile)


