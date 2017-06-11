
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './leaflet/leaflet.css'
import './leaflet/leaflet.js'
import './style.less'
import  china from './china.json'
import shannxi from './shannxi.json'
import city from './city.json'
export default class Footer extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      mymap:null
    }
 
  }
  setMyTravelData(mymap){
let chinaLayer=L.geoJSON(china).addTo(mymap)
let shannxiLayer=L.geoJSON(shannxi).addTo(mymap)
let cityLayer=L.geoJSON(city).addTo(mymap)
  }
  setContainer(mymap){
    L.tileLayer('https://api.mapbox.com/styles/v1/liyu2012/cityqu71v00dc2inzfrruxkjn/wmts?access_token=pk.eyJ1IjoibGl5dTIwMTIiLCJhIjoiY2l0eW1hZWp0MDdlZzJ0cW51OXMyemNidyJ9.-_AdgtFRwwrhpTjWG_nlsA', {
    maxZoom: 15,
}).addTo(mymap)
  }
  setMarker(point,mymap){
    const marker=L.marker(point).addTo(mymap)
    marker.bindPopup('has no icon!')
    return marker

  }

  componentDidMount(){
    const  mymap=L.map('map',{
  attributionControl:false
}).setView([37.9,106],3.8)
    this.setContainer(mymap)
    this.setMyTravelData(mymap)
    this.setMarker([34,107],mymap)
    var circle=L.circle([34,108.5],{
      color:'red',
      fillColor:'green',
      fillOpacity:0.6,
      radius:100000
    }).addTo(mymap).bindPopup('<b>地点：</b></br>西安市').openPopup()
   const polygon= L.polygon([
      [33,105],
       [33.7,105],
        [33.7,105.8],
         [32.4,105.1],
          [35,104]
    ],
    {color:'red',
    fillColor:'#05d1a4',
    fillOpacity:1
  }).addTo(mymap)
  function handleClick(e){
   // console.log(e.latlng)
    L.circle(e.latlng,{
       color:'green',
      fillColor:'green',
      fillOpacity:0.6,
      radius:100000
    }).addTo(mymap)
  }
  mymap.on('click',handleClick)
let iconConfig={
  iconUrl:'./dist/static/img/mapicon/plane.png',
  iconSize:[32,32],
  iconAnchor:[16,16],
  popupAnchor:[16,0]
}
  let customizeIcon=L.icon(
  iconConfig
  )
 let myIcon= L.marker([33,107],{
    icon:customizeIcon
  }).addTo(mymap)
  function handleContext(e){
    
   console.log(e)

  }
  mymap.on('contextmenu',handleContext)
  }
  render(){
    return(
   <section className="content">
     <div id="map"></div>
   </section>
    )
  }
} 