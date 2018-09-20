/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {Table, Input, Button, Icon, Modal, Spin, DatePicker, Select, Tabs, Form,TreeSelect} from 'antd';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
import {typeState} from '../../../config/status';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'
import {channel} from '../../../config/status';
// const nzhhk = require("nzh/hk");
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

const defaultState = {
  visible: false,
  appId: undefined,
  station:undefined,
  innerStation:undefined,
  goods:undefined,
};

const dataSource= [{
  key: '1',
  outSettleTime: 'John Brown',
  settleDays: 32,
  serialNumber: 'New York No. 1 Lake Park',
  bizAmt: 'New York No. 1 Lake Park',
  companyCode: 'New York No. 1 Lake Park',
  abstracts: 'New York No. 1 Lake Park',
  action1: 'New  1 Lake Park',
  action2: 'Nerk',
  action3: 'New Y1 Lake Park',
  action4: 'New YoLake Park',
  action5: 'Neake Park',
  action6: 'New Yoe Park',
  action7: 'NLake Park',
  action8: 'Newark',
  action9: 'New1 Lake Park',
  action10: 'Nek',
}];

class App extends Component {

  columns() {
    let array = [
      {
        title: '设备类型',
        dataIndex: 'outSettleTime',
        key: 'outSettleTime',
        width: 150,
        render: row => moment(row).format('YYYY-MM-DD')
      },
      {
        title: '设备图片',
        dataIndex: 'settleDays',
        key: 'settleDays',
        width: 200,
        render: row => row.length > 8 ? moment(row.split(',')[0]).format('YYYYMMDD') + '~' + moment(row.split(',')[row.split(',').length - 1]).format('YYYYMMDD') : moment(row).format('YYYYMMDD')
      },
      {
        title: '品类',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: 150,
      },
      {
        title: '品类ID',
        dataIndex: 'bizAmt',
        key: 'bizAmt',
        width: 170,
      },
      {
        title: '库存数量',
        dataIndex: 'companyCode',
        key: 'companyCode',
        width: 170,
        render: row => row || '--',
      },
      {
        title: '保留库存',
        dataIndex: 'abstracts',
        key: 'abstracts',
        width: 170,
      },
      {
        title: '人员属性',
        dataIndex: 'action1',
        key: 'action1',
        width: 100,
      },
      {
        title: '岗位序列',
        dataIndex: 'action2',
        key: 'action2',
        width: 100,
      },
      {
        title: '品牌',
        dataIndex: 'action3',
        key: 'action3',
        width: 100,
      },
      {
        title: '操作系统',
        dataIndex: 'action4',
        key: 'action4',
        width: 100,
      },
      {
        title: '尺寸',
        dataIndex: 'action5',
        key: 'action5',
        width: 100,
      },
      {
        title: '内存',
        dataIndex: 'action6',
        key: 'action6',
        width: 100,
      },
      {
        title: '硬盘',
        dataIndex: 'action7',
        key: 'action7',
        width: 100,
      },
      {
        title: 'CPU',
        dataIndex: 'action8',
        key: 'action8',
        width: 100,
      },
      {
        title: '显卡',
        dataIndex: 'action9',
        key: 'action',
        width: 100,
      },
      {
        title: '临时用机',
        dataIndex: 'action9',
        key: 'action9',
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'action10',
        key: 'action10',
        width: 100,
      },
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleTab = this.handleTab.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInnerCatagery = this.handleInnerCatagery.bind(this);
    this.handlePerson = this.handlePerson.bind(this);
    this.handleGoods = this.handleGoods.bind(this);
    this.handleStation = this.handleStation.bind(this);
    this.handleInnerStation = this.handleInnerStation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appList !== this.props.appList)
      this.setState({
        appList: nextProps.appList
      });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleInnerCatagery(value) {
    console.log(value);
    this.props.form.setFieldsValue({
      id: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      less: `${value === 'male' ? '1' : '2'}`,
    });
  }

  handleTab(value) {
    console.log(value);
  }

  handleNew(value) {
    console.log(value);
  }

  handlePrev(value) {
    console.log(value);
  }

  handlePerson(value) {
    this.setState({appId: value});
  }


  handleStation(value) {
    console.log(value);
    this.setState({ station:value });
  }

  handleInnerStation(value) {
    console.log(value);
    this.setState({ innerStation:value });
  }


  handleGoods(value) {
    console.log(value);
    this.setState({ goods:value });
  }


  componentDidMount() {
    this.props.fetchApps();
  }

  render() {
    const {appList} = this.state;
    const { getFieldDecorator } = this.props.form;

    return (

      <div className="month">
        <Modal
          centered
          width='900px'
          title="编辑"
          visible={this.state.visible}
          onCancel={() => {
            this.setState({visible: false})
          }}
          okButtonProps={{disabled: true}}
          cancelButtonProps={{disabled: true}}
        >
          <Form onSubmit={this.handleSubmit}>

            <FormItem
              label="设备类型"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <span>笔记本</span>
            </FormItem>

            <FormItem
              label="选择品类"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('goods', {
                rules: [{ required: true, message: 'Please select your gender!' }],
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleInnerCatagery}
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              label="品类ID"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '' }],
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              label="库存量"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('less', {
                rules: [{ required: true, message: '' }],
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              label="保留库存"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('rese', {
                rules: [{ required: true, message: '' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="保留库存"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('innerStation', {
                rules: [{ required: true}],
              })(
                <TreeSelect
                  showSearch
                  style={{width: 300}}
                  value={this.state.innerStation}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="请选择岗位"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.handleInnerStation}
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random"/>
                      <TreeNode value="leaf2" title="your leaf" key="random1"/>
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                      <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/>
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              )}
            </FormItem>

            <FormItem
              wrapperCol={{ span: 12, offset: 5 }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </Modal>
        <Tabs defaultActiveKey="1" onChange={this.handleTab}>
          <TabPane tab="笔记本" key="1">
            <div className="find">
              <div className="bank">
                <Select
                  style={{width: 220}}
                  placeholder="请选择人员"
                  value={this.state.appId}
                  onChange={this.handlePerson}
                  allowClear={true}
                >
                  {
                    appList && appList.list.map((item, i) =>
                      <Select.Option key={i} value={item.appId}>
                        {item.appName}({item.appId})
                      </Select.Option>
                    )
                  }
                </Select>
              </div>
              <div className="bank">
                <TreeSelect
                  showSearch
                  style={{width: 300}}
                  value={this.state.station}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="请选择岗位"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.handleStation}
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random"/>
                      <TreeNode value="leaf2" title="your leaf" key="random1"/>
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                      <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/>
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </div>
              <div className="bank">
                <TreeSelect
                  showSearch
                  style={{width: 300}}
                  value={this.state.goods}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="请选择品类"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.handleGoods}
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random"/>
                      <TreeNode value="leaf2" title="your leaf" key="random1"/>
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                      <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/>
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </div>
              <div className="bank">
                <Button type="primary" onClick={() => {
                  this.setState({
                    visible: true,
                  });
                }}>新增</Button>
              </div>
              <div className="bank">
                <Button type="primary" onClick={this.handlePrev}>预览</Button>
              </div>
              {
                dataSource ?
                  <Table
                    dataSource={dataSource}
                    columns={this.columns()}
                    pagination={{pageSize: dataSource.pageSize, current: dataSource.page, total: dataSource.total}}
                    scroll={{y: 640}}
                    onChange={this.handleTableChange}
                    locale={{emptyText: '暂无数据'}}
                  />:
                  <Table
                    dataSource={dataSource}
                    columns={this.columns()}
                    scroll={{y: 640}}
                    locale={{emptyText: '暂无数据'}}
                  />
              }
            </div>
          </TabPane>
          <TabPane tab="显示器" key="2">2</TabPane>
          <TabPane tab="主机" key="3">3</TabPane>
          <TabPane tab="一体机" key="4">4</TabPane>
        </Tabs>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    dataSource: state.month.data,
    appList: state.apps.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchMonth: (payload) => dispatch({
    type: actionTypes.FETCH_MONTH,
    payload
  }),
  fetchApps: (payload) => dispatch({
    type: actionTypes.FETCH_APPS,
    payload
  }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(App)));





