import './style.less'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MapPane from '../MapPane'
import MapTitle from '../../components/MapTitle'
export default class PointEditor extends React.Component{
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  }

  componentDidMount(){
  }
 
  handleOk(){
       const fillColor=this.refs['fill-color'].value
    const color=this.refs['color'].value
    const radius=parseFloat(this.refs['radius'].value)*1000
    const fillOpacity=1-parseFloat(this.refs['opacity'].value)
      this.props.handleOk({
      fillColor,
      color,
      radius,
      fillOpacity
    })
  }
  render(){
    return( <div className="box box-info point-editor">
 <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">{this.props.title}</h4>
                </div>

                <div className="modal-body">
                <div className="box-body">
                <div className="form-group">
                <label>填充颜色</label>
                <input type="color"  ref="fill-color"className="form-control my-colorpicker1"/>
            </div>
             <div className="form-group">
                <label>轮廓线颜色</label>
                <input type="color"  ref="color"className="form-control my-colorpicker1"/>
            </div>
            <div className="form-group">
                <label>选择半径</label>
                <div className="input-group my-colorpicker2">
                    <input type="text"  ref="radius" className="form-control"/><span>:km</span>
                </div>      
            </div>      
            <div className="form-group">
                <label>透明度</label>
                <div className="input-group my-colorpicker2">
                    <input type="text" ref="opacity" className="form-control"/>
                </div>      
            </div>    
        </div>
                </div>
                <div className="modal-footer">
                    <button data-dismiss="modal" className="btn btn-danger">关闭</button><button data-dismiss="modal" onClick={this.handleOk.bind(this)} className="btn btn-success">确定</button>
                </div>
            </div>

       

    </div>
 
    )
  }
} 