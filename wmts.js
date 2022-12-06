import './style.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Tile from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import VectorLayer from 'ol/layer/Vector'
import { Circle, Fill, Stroke, Style, Icon } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'

import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { Select } from 'ol/interaction'
import { pointerMove } from 'ol/events/condition'
import { singleClick } from 'ol/events/condition'

import {Projection} from 'ol/proj'
import BASEMAP_LAYERS from  "./basemap"

const map = new Map({
    target: 'map',
    layers:BASEMAP_LAYERS,
    view: new View({
        center: [104.22, 30.23],
        zoom: 10,
        projection: 'EPSG:4326',
        // projection: 'EPSG:4490',
    }),
})


//切片名
let matrixIds = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3',
    'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8',
    'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13',
    'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18',
    'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
//分辨率
let resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625,
    0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
    0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4,
    1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5,
    1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6,
    6.705522537231445E-7, 3.3527612686157227E-7];

//切片策略
let tileGrid = new WMTSTileGrid({
    tileSize: [256,256],
    extent: [-180.0,-90.0,180.0,90.0],  //范围
    origin: [-180.0, 90.0],   //切片原点
    resolutions: resolutions,   //分辨率
    matrixIds: matrixIds    //层级标识列表，与地图级数保持一致
});
//设置地图投影
let projection = new Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu'
});

let tileSource = new WMTS({
    url: 'http://172.16.228.128:8080/geoserver/gwc/service/wmts',
    layer:"gas:team",
    format: "image/png",
    matrixSet:"EPSG:4326",
    projection: projection,
    tileGrid: tileGrid
});

let tileLayer = new Tile({
    opacity:0.7,    //透明度
    source: tileSource,
    wrapX:false,
});


map.addLayer(tileLayer)




