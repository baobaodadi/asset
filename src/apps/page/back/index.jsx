/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {Table, Input, Button, Icon,Upload,Switch,Modal, Spin, message, DatePicker, Select, Tabs, Form,TreeSelect} from 'antd';
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

const defaultState = {
  visible: false,
  loading: false,
  appId: undefined,
  station:undefined,
  innerStation:undefined,
  goods:undefined,
  deviceType:'NOTEBOOK',
  catagery:[],
  innercatagery:undefined,
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Back extends Component {

  columns() {
    let array = [
      {
        title: '设备类型',
        dataIndex: 'outSettleTime',
        key: 'outSettleTime',
        width: 150,
      },
      {
        title: '设备图片',
        dataIndex: 'settleDays',
        key: 'settleDays',
        width: 200,
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
    this.normFile = this.normFile.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onMarkChange = this.onMarkChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInnerCatagery = this.handleInnerCatagery.bind(this);
    this.handleCatagery = this.handleCatagery.bind(this);
    this.handlePerson = this.handlePerson.bind(this);
    this.handleGoods = this.handleGoods.bind(this);
    this.handleStation = this.handleStation.bind(this);
    this.handleInnerStation = this.handleInnerStation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.appList !== this.props.appList)
    //   this.setState({
    //     appList: nextProps.appList
    //   });

  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

    handleCatagery(value) {
        console.log(value);
    }

  handleInnerCatagery(value) {
    console.log(value);
    this.props.form.setFieldsValue({
      id: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      less: `${value === 'male' ? '1' : '2'}`,
    });
  }

  handleTab(value) {
    this.setState({ deviceType:value });
  }

  handleCancel(value) {
    this.setState({visible: false})
  }

  handleOk(value) {
    this.handleSubmit();
    this.setState({visible: false})
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onMarkChange(value) {


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

  handleUploadChange (info){
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  normFile (e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


  componentDidMount() {
    this.props.fetchback({deviceType:this.state.deviceType});
  }

  render() {
    const {back} = this.props;
    const { getFieldDecorator } = this.props.form;
    const imageUrl = this.state.imageUrl;

    return (

      <div className="back">
        <Modal
          centered
          width='900px'
          title="编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
                      style={{ width: 300 }}
                      placeholder="请选择品类"
                      onChange={this.handleInnerCatagery}
                  >
                      {
                          back &&back.category&& back.category.map((item, i) =>
                              <Select.Option key={i} value={item.id}>
                                  {item.name}
                              </Select.Option>
                          )
                      }
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
              label="选择岗位"
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
                  <TreeNode value="parent 1" title="parent 1" key="0-1" selectable={false}>
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random"/>
                      <TreeNode value="leaf2" title="your leaf" key="random1"/>
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                      <TreeNode value="sss" title='sss' key="random3"/>
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              )}
            </FormItem>

            <FormItem
              label="品牌"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{'display':'inline-block','marginLeft': '120px'}}
            >
              {getFieldDecorator('mark', {
                rules: [{ required: true, message: '' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 5 }}
              style={{'display':'inline-block','marginLeft': '60px'}}
            >
              {getFieldDecorator('markflag', { valuePropName: 'checked'})(
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked onChange={this.onMarkChange} />,
              )}
            </FormItem>

            <FormItem
              label="临时用机"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('temp', { valuePropName: 'checked',rules: [{ required: true, message: '' }]})(
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked  />,
              )}
            </FormItem>

            <FormItem
              label="上传图片"
              extra="longgggggggggggggggggggggggggggggggggg"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(

                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleUploadChange}
                >
                  {imageUrl ?
                    <img src={imageUrl} alt="avatar" /> :
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  }
                </Upload>

              )}
            </FormItem>

          </Form>
        </Modal>
        <Tabs defaultActiveKey="1" onChange={this.handleTab}>
          <TabPane tab="笔记本" key="NOTEBOOK">
            <div className="find">
              <div className="bank">
                <Select
                    mode="multiple"
                    style={{ width: 300 }}
                    placeholder="请选择品类"
                    defaultValue={this.state.catagery}
                    onChange={this.handleCatagery}
                >
                  {
                    back &&back.category&& back.category.map((item, i) =>
                      <Select.Option key={i} value={item.id}>
                        {item.name}
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
                      <TreeNode value="sss" title='sss' key="random3"/>
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
          </TabPane>
          <TabPane tab="显示器" key="MONITOR">2</TabPane>
          <TabPane tab="主机" key="HOST">3</TabPane>
          <TabPane tab="一体机" key="UIONMAC">4</TabPane>
        </Tabs>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
      back: state.back.data,
  })
};


const mapDispatchToProps = dispatch => ({
    fetchback: (payload) => dispatch({
    type: actionTypes.FETCH_BACK,
    payload
  }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Back)));





