import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS'
import {fromLonLat} from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer} from 'ol/layer';
const map = new Map({
    target: 'map', layers: [new TileLayer({
        source: new OSM()
    })], view: new View({
    zoom: 10,
        center: [104.22, 30.23],
        projection:"EPSG:4326"
    })
});

/*=======img-wms========*/

class WmsLayer{
    constructor(url,params,map) {
        this.url = url
        this.params = params
        this.map = map
        this.addWmsService()
    }
    createWmsService() {
        const wmsSoure = new ImageWMS({
            url: this.url,
            params: this.params,
            serverType: 'geoserver',
            projection:"EPSG:4326"
        })
        // var max = params.max || 0
        // var min = params.min || 21
        return new ImageLayer({
            // name: type,
            // className: 'wms',
            // opacity: opacity,
            source: wmsSoure,
            // maxResolution: this.resolutions[max],
            // minResolution: this.resolutions[min],
            // zIndex: params.zIndex || 103
        })
    }
    addWmsService() {
        // this.removeWmsLayerByType(type)
        // var wmsLayer = this.createWmsService(type, opacity, url, params)
        // this.wmsLayers[type] = wmsLayer
        // console.log("创建图层1-1");
        // olMapConfig.map.addLayer(wmsLayer)
        const wmsLayer = this.createWmsService()
        // this.wmsLayers[type] = wmsLayer
        this.map.addLayer(wmsLayer)
    }
}


new WmsLayer("http://10.1.47.189:18091/geoserver/gas/wms",{
    LAYERS:"gas:Risk_ZH",
},map)

