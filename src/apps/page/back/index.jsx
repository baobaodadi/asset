/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import {findname,findkey} from  "../../../utils/findname"
import './index.less';
import {
  Table,
  Input,
  Button,
  Icon,
  Upload,
  Switch,
  Modal,
  Select,
  Tabs,
  Form,
  TreeSelect,
  Divider,
  InputNumber
} from 'antd';

const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;

const defaultState = {
  visible: false,
  loading: false,
  appId: undefined,
  addOrEdit: 1,

  deviceType: 'NOTEBOOK',
  suiteId: [],
  categoryId: [],

  //MODAL STATE
  suiteIdInner: [],
  categoryIdInner: undefined,
  assetStockInner: 0,
  assetKeepStockInner: 0,
  brandInner: undefined,
  brandStatusInner: 1,
  osInner: undefined,
  osStatusInner: 1,
  sizeInner: undefined,
  sizeStatusInner: 1,
  memoryInner: undefined,
  memoryStatusInner: 1,
  diskInner: undefined,
  diskStatusInner: 1,
  cpuInner: undefined,
  cpuStatusInner: 1,
  cardInner: undefined,
  cardStatusInner: 1,
  adapterInner: undefined,
  adapterStatusInner: 1,
  resolutionInner: undefined,
  resolutionStatusInner: 1,
  tempUseInner: 0,
  assetPictureInner: undefined,
  assetStatusInner: 1,
  recommendInner: 0

};


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
        dataIndex: 'deviceType',
        key: 'deviceType',
        width: 100,
      },
      {
        title: '设备图片',
        dataIndex: 'assetPicture',
        key: 'assetPicture',
        width: 200,
        render: (text) => (
          <img src={text} alt="" style={{width: '100%'}}/>
        ),
      },
      {
        title: '品类',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 150,
      },
      {
        title: '品类ID',
        dataIndex: 'categoryId',
        key: 'categoryId',
        width: 170,
      },
      {
        title: '库存数量',
        dataIndex: 'assetStock',
        key: 'assetStock',
        width: 170,

      },
      {
        title: '保留库存',
        dataIndex: 'assetKeepStock',
        key: 'assetKeepStock',
        width: 170,
        render: (text, record) => (
          record.assetStock < text ? '补货中' : text
        )
      },
      {
        title: '岗位序列',
        dataIndex: 'suiteId',
        key: 'suiteId',
        width: 100,
        render: (text) => {
          return  (findname(this.props.position,text)).toString()
        }
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
        width: 100,
      },
      {
        title: '操作系统',
        dataIndex: 'os',
        key: 'os',
        width: 100,
      },
      {
        title: '尺寸',
        dataIndex: 'size',
        key: 'size',
        width: 100,
      },
      {
        title: '内存',
        dataIndex: 'memory',
        key: 'memory',
        width: 100,
      },
      {
        title: '硬盘',
        dataIndex: 'disk',
        key: 'disk',
        width: 100,
      },
      {
        title: 'CPU',
        dataIndex: 'cpu',
        key: 'cpu',
        width: 100,
      },
      {
        title: '显卡',
        dataIndex: 'card',
        key: 'card',
        width: 100,
      }, {
        title: '分辨率',
        dataIndex: 'adapter',
        key: 'adapter',
        width: 100,
      }, {
        title: '接口',
        dataIndex: 'resolution',
        key: 'resolution',
        width: 100,
      },
      {
        title: '临时用机',
        dataIndex: 'tempUse',
        key: 'tempUse',
        width: 100,
        render: (text) => (
          text ? '是' : '否'
        )
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (text, record) => (
          <span>
                      <a
                        onClick={() => {
                          this.setState({
                            assetPictureInner: record.assetPicture,
                            assetId: record.assetId,
                            visible: true,
                            addOrEdit: 0,
                          })
                          this.props.form.setFieldsValue({
                            suiteIdInner: findname(this.props.position,record.suiteId),
                            categoryIdInner: record.categoryId,
                            assetStockInner: record.assetStock,
                            assetKeepStockInner: record.assetKeepStock,
                            brandInner: record.brand,
                            brandStatusInner: record.brandStatus,
                            osInner: record.os,
                            osStatusInner: record.osStatus,
                            sizeInner: record.size,
                            sizeStatusInner: record.sizeStatus,
                            memoryInner: record.memory,
                            memoryStatusInner: record.memoryStatus,
                            diskInner: record.disk,
                            diskStatusInner: record.diskStatus,
                            cpuInner: record.cpu,
                            cpuStatusInner: record.cpuStatus,
                            cardInner: record.card,
                            cardStatusInner: record.cardStatus,
                            adapterInner: record.adapter,
                            adapterStatusInner: record.adapterStatus,
                            resolutionInner: record.resolution,
                            resolutionStatusInner: record.resolutionStatus,
                            tempUseInner: +record.tempUse,
                            // assetStatusInner: record.assetStatus,
                          });
                        }}
                      >编辑</a>
                      <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchsort({assetId: record.assetId, recommend: 1})
                          this.delayfresh();
                        }}
                      >推荐</a>
                        <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchsort({assetId: record.assetId, move: -1})
                          this.delayfresh();
                        }}
                      >置上</a>
                        <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchsort({assetId: record.assetId, move: 1})
                          this.delayfresh();
                        }}
                      >置下</a>
                    </span>
        ),
      }
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleTab = this.handleTab.bind(this);
    this.delayfresh = this.delayfresh.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.tableList = this.tableList.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCatagoryInner = this.handleCatagoryInner.bind(this);
    this.handleCatagory = this.handleCatagory.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleInnerPosition = this.handleInnerPosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list)
      this.setState({
        list: nextProps.list
      });

  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.state.addOrEdit) {
          this.props.fetchadd({
            deviceType:this.state.deviceType,
            assetId: this.state.assetId,
            suiteId: findkey(this.props.position,values.suiteIdInner).toString(),
            categoryId: values.categoryIdInner,
            assetStock: values.assetStockInner,
            assetKeepStock: values.assetKeepStockInner,
            brand: values.brandInner,
            brandStatus: +values.brandStatusInner,
            os: values.osInner,
            osStatus: +values.osStatusInner,
            size: values.sizeInner,
            sizeStatus: +values.sizeStatusInner,
            memory: values.memoryInner,
            memoryStatus: +values.memoryStatusInner,
            disk: values.diskInner,
            diskStatus: +values.diskStatusInner,
            cpu: values.cpuInner,
            cpuStatus: +values.cpuStatusInner,
            card: values.cardInner,
            cardStatus: +values.cardStatusInner,
            adapter: values.adapterInner,
            adapterStatus: +values.adapterStatusInner,
            resolution: values.resolutionInner,
            resolutionStatus: +values.resolutionStatusInner,
            tempUse: +values.tempUseInner,
            assetPicture: this.state.assetPictureInner,
            // assetStatus: +values.assetStatusInner,
            recommend: values.recommendInner,
          })
        } else {
          this.props.fetchedit({
            deviceType:this.state.deviceType,
            assetId: this.state.assetId,
            suiteId: findkey(this.props.position,values.suiteIdInner).toString(),
            // categoryId: values.categoryIdInner,
            assetStock: values.assetStockInner,
            assetKeepStock: values.assetKeepStockInner,
            brand: values.brandInner,
            brandStatus: +values.brandStatusInner,
            os: values.osInner,
            osStatus: +values.osStatusInner,
            size: values.sizeInner,
            sizeStatus: +values.sizeStatusInner,
            memory: values.memoryInner,
            memoryStatus: +values.memoryStatusInner,
            disk: values.diskInner,
            diskStatus: +values.diskStatusInner,
            cpu: values.cpuInner,
            cpuStatus: +values.cpuStatusInner,
            card: values.cardInner,
            cardStatus: +values.cardStatusInner,
            adapter: values.adapterInner,
            adapterStatus: +values.adapterStatusInner,
            resolution: values.resolutionInner,
            resolutionStatus: +values.resolutionStatusInner,
            tempUse: +values.tempUseInner,
            assetPicture: this.state.assetPictureInner,
            // assetStatus: +values.assetStatusInner,
            recommend: values.recommendInner,
          })
        }
      }
    });


  }


  handleCatagory(value) {
    console.log(value);
    this.setState({categoryId: value});
  }

  handleCatagoryInner(value) {
    // console.log(value);
    // this.props.form.setFieldsValue({
    //     id: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    //     less: `${value === 'male' ? '1' : '2'}`,
    // });
  }

  handleTab(value) {
    this.setState({
      deviceType: value,
      categoryId: [],
      suiteId:[]
    });
    this.props.fetchback({deviceType: value});
    this.props.fetchlist({
      deviceType: value,
      suiteId: this.state.suiteId.toString(),
      categoryId: this.state.categoryId.toString(),
    });
  }

  handleCancel(value) {
    this.setState({visible: false})
  }

  delayfresh(){
    setTimeout(()=>{
      this.handleSearch();
    },500)
  }

  handleOk(value) {
    this.setState({
      visible: false,
      addOrEdit: 0,
      assetPictureInner: undefined,
    });
    this.handleSubmit();
    this.delayfresh();
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  handleNew(value) {
    // console.log(value);
  }

  handleSearch() {
    // console.log(this.state.categoryId);
    this.props.fetchlist({
      deviceType: this.state.deviceType,
      suiteId: findkey(this.props.position,this.state.suiteId),
      categoryId: this.state.categoryId.toString(),
    });
  }

  handleTableChange(value) {

  }


  handlePosition(value, label, extra) {
    console.log(value, label, extra);
    this.setState({suiteId: value});
  }

  handleInnerPosition(value) {
    console.log(value);
    this.setState({innerPosition: value});
  }


  handleUploadChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        assetPictureInner: info.fileList[0].response.data[0].url,
        loading: false,
      })
      // getBase64(info.file.originFileObj, imageUrl => {
      //   {
      //     console.log(imageUrl)
      //     this.setState({
      //       assetPictureInner: imageUrl,
      //       loading: false,
      //     })
      //   }
      // });
    }
  }

  normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  tableList(list) {
    return (
      <div className="tablelist">
        {
          list ?
            <Table
              align='center'
              dataSource={list}
              columns={this.columns()}
              scroll={{y: 640}}
              onChange={this.handleTableChange}
              locale={{emptyText: '暂无数据'}}
            /> :
            <Table
              align='center'
              dataSource={list}
              columns={this.columns()}
              scroll={{y: 640}}
              locale={{emptyText: '暂无数据'}}
            />
        }
      </div>
    )
  }

  searchBar(back, position) {
    return (
      <div className="find">
        <div className="bank">
          <Select
            mode="multiple"
            style={{width: 300}}
            placeholder="请选择品类"
            defaultValue={this.state.categoryId}
            onChange={this.handleCatagory}
          >
            {
              back && back.map((item, i) =>
                <Select.Option key={i} value={item.typeId}>
                  {item.typeName}
                </Select.Option>
              )
            }
          </Select>
        </div>
        <div className="bank">
          <TreeSelect
            showSearch
            style={{width: 300}}
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
          <Button type="primary" onClick={this.handleSearch}>查询</Button>
        </div>
        <div className="bank">
          <Button type="primary" onClick={() => {
            this.props.form.setFieldsValue({
              suiteIdInner: undefined,
              categoryIdInner: undefined,
              assetStockInner: undefined,
              assetKeepStockInner: undefined,
              brandInner: undefined,
              brandStatusInner: 1,
              osInner: undefined,
              osStatusInner: 1,
              sizeInner: undefined,
              sizeStatusInner: 1,
              memoryInner: undefined,
              memoryStatusInner: 1,
              diskInner: undefined,
              diskStatusInner: 1,
              cpuInner: undefined,
              cpuStatusInner: 1,
              cardInner: undefined,
              cardStatusInner: 1,
              adapterInner: undefined,
              adapterStatusInner: 1,
              resolutionInner: undefined,
              resolutionStatusInner: 1,
              tempUseInner: 0,
              assetPictureInner: undefined,
              // assetStatusInner: 1,
            });
            this.setState({
              visible: true,
              addOrEdit: 1,
            });
          }}>新增</Button>
        </div>

      </div>
    )
  }


  componentDidMount() {
    this.props.fetchback({deviceType: this.state.deviceType});
    this.props.fetchlist({
      deviceType: this.state.deviceType,
      suiteId: this.state.suiteId.toString(),
      categoryId: this.state.categoryId.toString(),
    });
    this.props.fetchPosition();
  }

  render() {
    const {back, position} = this.props;
    const {list} = this.state;
    const {getFieldDecorator} = this.props.form;
    // const imageUrl = this.state.assetPictureInner;

    return (
      <div className="back">
        <Modal
          centered
          width="900px"
          title="编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>{this.state.categoryIdInner}</div>
          <Form onSubmit={this.handleSubmit}>

            <FormItem
              label="设备类型"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              <span>笔记本</span>
            </FormItem>

            <FormItem
              label="选择品类"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('categoryIdInner', {
                rules: [{required: true, message: 'Please select your gender!'}],
              })(
                <Select
                  style={{width: 300}}
                  placeholder="请选择品类"
                  onChange={this.handleCatagoryInner}
                  disabled={!this.state.addOrEdit}
                >
                  {
                    back && back.map((item, i) =>
                      <Select.Option key={i} value={item.typeId}>
                        {item.typeName}
                      </Select.Option>
                    )
                  }
                </Select>
              )}
            </FormItem>

            {/*<FormItem*/}
            {/*label="品类ID"*/}
            {/*labelCol={{span: 5}}*/}
            {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
            {/*{getFieldDecorator('categoryIdInner', {*/}
            {/*//rules: [{required: true, message: ''}],*/}
            {/*})(*/}
            {/*<Input disabled={!this.state.addOrEdit} />*/}
            {/*)}*/}
            {/*</FormItem>*/}

            {/*<FormItem*/}
              {/*label="库存量"*/}
              {/*labelCol={{span: 5}}*/}
              {/*wrapperCol={{span: 12}}*/}
            {/*>*/}
              {/*{getFieldDecorator('assetStockInner', {*/}
                {/*//rules: [{required: true, message: ''}],*/}
              {/*})(*/}
                {/*<InputNumber disabled/>*/}
              {/*)}*/}
            {/*</FormItem>*/}

            <FormItem
              label="保留库存"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('assetKeepStockInner', {
                //rules: [{required: true, message: ''}],
              })(
                <InputNumber/>
              )}
            </FormItem>

            <FormItem
              label="选择岗位"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('suiteIdInner', {
                rules: [{required: true}],
              })(
                <TreeSelect
                  showSearch
                  style={{width: 300}}
                  // value={this.state.innerPosition}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="请选择岗位"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.handleInnerPosition}
                  treeData={position}
                />
              )}
            </FormItem>

            <ul className="innerlist">
              <li>
                <FormItem
                  label="品牌"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('brandInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('brandStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="系统"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('osInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('osStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="尺寸"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('sizeInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('sizeStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>

              <li>
                <FormItem
                  label="内存"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('memoryInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('memoryStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="硬盘"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('diskInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('diskStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>

              <li>
                <FormItem
                  label="cpu"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('cpuInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('cpuStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="显卡"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('cardInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('cardStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="分辨率"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('resolutionInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('resolutionStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="接口"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  style={{'display': 'inline-block', 'marginLeft': '80px'}}
                >
                  {getFieldDecorator('adapterInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 5}}
                  style={{'display': 'inline-block', 'marginLeft': '60px'}}
                >
                  {getFieldDecorator('adapterStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="开" unCheckedChildren="关"/>,
                  )}
                </FormItem>
              </li>
            </ul>

            <FormItem
              label="临时用机"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('tempUseInner', {
                valuePropName: 'checked',
                rules: [{required: true, message: ''}]
              })(
                <Switch checkedChildren="是" unCheckedChildren="否"/>,
              )}
            </FormItem>

            <FormItem
              label="上传图片"
              extra="限制500K"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}
            >
              {getFieldDecorator('assetPictureInner', {
                // valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="/oss/upload/imgUseDwarf/"
                  onChange={this.handleUploadChange}
                >
                  {this.state.assetPictureInner ?
                    <img src={this.state.assetPictureInner} alt="avatar"/> :
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  }
                </Upload>
              )}
            </FormItem>

          </Form>
        </Modal>
        <Tabs defaultActiveKey="NOTEBOOK" onChange={this.handleTab}>
          <TabPane tab="笔记本" key="NOTEBOOK">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="显示器" key="MONITOR">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="台式机" key="HOST">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="一体机" key="UIONMAC">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    back: state.back.data,
    list: state.list.data,
    position: state.position.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchback: (payload) => dispatch({
    type: actionTypes.FETCH_BACK,
    payload
  }),
  fetchlist: (payload) => dispatch({
    type: actionTypes.FETCH_LIST,
    payload
  }),
  fetchadd: (payload) => dispatch({
    type: actionTypes.FETCH_ADD,
    payload
  }),
  fetchedit: (payload) => dispatch({
    type: actionTypes.FETCH_EDIT,
    payload
  }),
  fetchsort: (payload) => dispatch({
    type: actionTypes.FETCH_SORT,
    payload
  }),
  fetchPosition: (payload) => dispatch({
    type: actionTypes.FETCH_POSITION,
    payload
  })
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Back)));





