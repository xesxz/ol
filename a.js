import './style.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Circle, Fill, Stroke, Style, Icon } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'

import { Select } from 'ol/interaction'
import { pointerMove } from 'ol/events/condition'
import { singleClick } from 'ol/events/condition'
import {
  Tile
} from "ol/layer";
// import BASEMAP_LAYERS from  "./basemap"
import {BaiduMap} from './BaiduMap.js'

const baiduSource = new BaiduMap()


const baiduLayer = new Tile({
  source:baiduSource
})









const map = new Map({
  target: 'map',
  layers: [

  ],
  view: new View({
    center: [104.06337253910306,30.659861306552347],
    zoom: 10,
    projection: 'EPSG:4326',
  }),
})


map.addLayer(baiduLayer)







