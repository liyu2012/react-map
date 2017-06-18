
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './leaflet/leaflet.css'
import './leaflet/leaflet.js'
import './style.less'
import  china from './china.json'
import shannxi from './shannxi.json'
import city from './city.json'
import {Provider,connect} from 'react-redux'
import {bindActionCreators,createStore} from 'redux'
import actions from '../../actions/point'
import {get} from '../../fetch/get'
class MapPane extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      mymap:null,
      commonPoints:[],
      markers:[],
      editType:null,
      iconUrl:'',
      pointSettings:{}
    }
 
  }
  setJSONLayer(mymap){
let chinaLayer=L.geoJSON(china).addTo(mymap)
let shannxiLayer=L.geoJSON(shannxi).addTo(mymap)
//let cityLayer=L.geoJSON(city).addTo(mymap)
  }
  setContainer(mymap){
    L.tileLayer('https://api.mapbox.com/styles/v1/liyu2012/cityqu71v00dc2inzfrruxkjn/wmts?access_token=pk.eyJ1IjoibGl5dTIwMTIiLCJhIjoiY2l0eW1hZWp0MDdlZzJ0cW51OXMyemNidyJ9.-_AdgtFRwwrhpTjWG_nlsA', {
    maxZoom: 15,
}).addTo(mymap)
  }
  setMarkers(points,mymap){
   for(let i=0;i<points.length;i++){
  const iconConfig={
  iconUrl:points[i].iconUrl,
  iconSize:[32,32],
  iconAnchor:[16,16],
  popupAnchor:[16,0]
}
  const customizeIcon=L.icon(
  iconConfig
  )

L.marker(points[i].latlng,{
  icon:customizeIcon
}).addTo(mymap)
   }

  }
  setPoints(points,mymap){
    points.map((item,index)=>{
L.circle(item.axis,item.pointSettings).addTo(mymap)
    })
  }
  componentWillUpdate(nextProps,nextStates){
    let _this=this
   
    if(nextStates.commonPoints[0]){
this.setPoints(nextStates.commonPoints,this.state.mymap)
    }
    
    if(nextStates.markers[0]){

      this.setMarkers(nextStates.markers,this.state.mymap)
    }
    //自定义图标编辑
    if(nextProps.editType===2){
this.setState({
  editType:nextProps.editType,
  iconUrl:nextProps.iconSettings.src
})
    }
    else if(nextProps.editType===1){
  this.setState({
  editType:1,
  pointSettings:nextProps.pointSettings

})
    }
  }
  getPoints(){
const url='api/points/1'
  get(url).then(res=>{
    return res.json()
  }).then(json=>{
    if(json.statusCode===1){
  this.setState({
        commonPoints:JSON.parse(json.data)
      })
    }
    
  })
}
getMarkers(){
  const url='api/markers'
  get(url).then(res=>{
    return res.json()
  }).then(json=>{
    if(json.statusCode===1){
  this.setState({
        markers:JSON.parse(json.data)
      })
    }
    
  })
}
componentWillMount(){
  //获取用户编辑的点
  this.getPoints()
  //获取用户编辑的marker
  this.getMarkers()
  
}
  componentDidMount(){
   let  _this=this
//设置地图容器，实例化地图对象
    const  mymap=L.map('map',{
  attributionControl:false
}).setView([37.9,106],3.8)

this.setState({
  mymap,
})
//this.setContainer(mymap)
this.setJSONLayer(mymap)
//this.setMarker([34,107],mymap)
  function handleClick(e){
if(_this.state.editType===2){
  const iconConfig={
  iconUrl:_this.state.iconUrl,
  iconSize:[32,32],
  iconAnchor:[16,16],
  popupAnchor:[16,0]
}
 const customizeIcon=L.icon(
  iconConfig
  )
  const icon={
    latlng:e.latlng,
    iconUrl:_this.state.iconUrl
  }
   _this.props.actions.addIcon(icon)
   L.marker(e.latlng,{
      icon:customizeIcon
    }).addTo(_this.state.mymap)
  }
  else if(_this.state.editType===1){
      const point={
      axis:e.latlng,
      pointSettings:_this.state.pointSettings
    }
    _this.props.actions.addPoint(point)
    L.circle(e.latlng,_this.props.pointSettings).addTo(mymap)
  }
   
}

  mymap.on('click',handleClick)
  function handleContext(e){
    

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

function mapStateToProps(state){
return{

}
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapPane)