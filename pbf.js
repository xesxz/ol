import './style.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import { Circle, Fill, Stroke, Style, Icon } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'

import { Select } from 'ol/interaction'
import { pointerMove } from 'ol/events/condition'
import { singleClick } from 'ol/events/condition'
import VectorSource from 'ol/source/Vector'
import BASEMAP_LAYERS from  "./basemap"
import {createXYZ} from 'ol/tilegrid';
import MVT from 'ol/format/MVT';
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

var layer = 'gas:car';
var projection_epsg_no = '900913';
const pbfLayer = new VectorLayer({
    source: new VectorSource({
        tilePixelRatio: 1, // oversampling when > 1
        tileGrid: createXYZ({maxZoom: 19}),
        format: new MVT(),
        // url: 'http://172.16.228.128:8080/geoserver/gwc/service/tms/1.0.0/' + layer +
        //     '@EPSG%3A900913@' + '@pbf/{z}/{x}/{-y}.pbf'

        url: 'http://172.16.228.128:8080/geoserver/gwc/service/tms/1.0.0/' + layer +
            '@EPSG%3A'+projection_epsg_no+'@pbf/{z}/{x}/{-y}.pbf'
    })
})


map.addLayer(pbfLayer)
