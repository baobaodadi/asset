/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Radio,
  List,
  Spin,
  Card,
  DatePicker,
  Select,
  Tabs,
  Form,
  TreeSelect,
} from 'antd';
import 'moment/locale/zh-cn'


const defaultState = {
  suiteId:undefined,
  select: '1'
};

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Position extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handlePosition = this.handlePosition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {

  }

  handleSubmit(e) {

  }

  handlePosition(value) {
    console.log(value);
    this.setState({suiteId: value});
  }


  componentDidMount() {
    this.props.fetchPosition();
  }

  render() {
    const {position} = this.props;

    return (

      <div className="position">
          <div className="find">
            <div className="bank">
              <TreeSelect
                showSearch
                style={{width: 600}}
                value={this.state.suiteId}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="请选择岗位"
                allowClear
                multiple
                treeDefaultExpandAll
                treeData={position}
                onChange={this.handlePosition}
              />
            </div>
            <div className="bank">
              <Button type="primary" onClick={() => {
                this.setState({
                  visible: true,
                });
              }}>新增</Button>

              <RadioButton >选择</RadioButton>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    position: state.position.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchPosition: (payload) => dispatch({
    type: actionTypes.FETCH_POSITION,
    payload
  })
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Position));





