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
    Upload,
    Switch,
    Modal,
    Select,
    Tabs,
    Form,
    TreeSelect,
    Divider
} from 'antd';

const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;

const defaultState = {
    visible: false,
    loading: false,
    appId: undefined,

    deviceType: 'NOTEBOOK',
    positionId: [],
    categoryId: [],

    //MODAL STATE
    positionIdInner: [],
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
    resolutionInner: undefined,
    resolutionStatusInner: 1,
    interfaceInner: undefined,
    interfaceStatusInner: 1,
    tempUseInner: 0,
    assetPictureInner: '',
    assetStatusInner: 1

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
                width: 150,
            },
            {
                title: '设备图片',
                dataIndex: 'assetPicture',
                key: 'assetPicture',
                width: 200,
                render: (text) => (
                    <img src={text} alt="" style={{width:'100%'}}/>
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
                render: row => row || '--',
            },
            {
                title: '保留库存',
                dataIndex: 'assetKeepStock',
                key: 'assetKeepStock',
                width: 170,
            },
            {
                title: '岗位序列',
                dataIndex: 'positionId',
                key: 'positionId',
                width: 100,
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
                dataIndex: 'resolution',
                key: 'resolution',
                width: 100,
            }, {
                title: '接口',
                dataIndex: 'interface',
                key: 'interface',
                width: 100,
            },
            {
                title: '临时用机',
                dataIndex: 'tempUse',
                key: 'tempUse',
                width: 100,
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: (text, record) => (
                    <span>
                      <a onClick={() => {
                          this.setState({
                              positionIdInner: record.positionId,
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
                              resolutionInner: record.resolution,
                              resolutionStatusInner: record.resolutionStatus,
                              interfaceInner: record.interface,
                              interfaceStatusInner: record.interfaceStatus,
                              tempUseInner: record.tempUse,
                              assetPictureInner: record.assetPicture,
                              assetStatusInner: record.assetStatus,
                          },()=>{

                                  this.props.form.setFieldsValue({
                                      categoryId: record.categoryId,
                                  });
                              this.setState({visible: true})
                          })

                      }
                      }>编辑</a>
                      <Divider type="vertical"/>
                      <a href="javascript:;">推荐</a>
                        <Divider type="vertical"/>
                      <a href="javascript:;">置上</a>
                        <Divider type="vertical"/>
                      <a href="javascript:;">置下</a>
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
        this.normFile = this.normFile.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
        this.onMarkChange = this.onMarkChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
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
            }
        });
    }


    handleCatagory(value) {
        console.log(value);
        this.setState({categoryId: value});
    }

    handleCatagoryInner(value) {
        console.log(value);
        // this.props.form.setFieldsValue({
        //     id: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        //     less: `${value === 'male' ? '1' : '2'}`,
        // });
    }

    handleTab(value) {
        this.setState({deviceType: value});
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

    handleSearch() {
        console.log(this.state.categoryId);
        this.props.fetchlist({
            deviceType: this.state.deviceType,
            positionId: this.state.positionId.toString(),
            categoryId: this.state.categoryId.toString(),
        });
    }

    handleTableChange(value) {
        console.log(value);
    }


    handlePosition(value) {
        console.log(value);
        this.setState({positionId: value});
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
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    searchBar(back) {
        return (
            <div className="find">
                <div className="bank">
                    <Select
                        style={{width: 300}}
                        placeholder="请选择品类"
                        defaultValue={this.state.categoryId}
                        onChange={this.handleCatagory}
                    >
                        {
                            back && back.category && back.category.map((item, i) =>
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
                        value={this.state.positionId}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder="请选择岗位"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        onChange={this.handlePosition}
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
                    <Button type="primary" onClick={this.handleSearch}>查询</Button>
                </div>
                <div className="bank">
                    <Button type="primary" onClick={() => {
                        this.setState({
                            visible: true,
                        });
                    }}>新增</Button>
                </div>

            </div>
        )
    }


    componentDidMount() {
        this.props.fetchback({deviceType: this.state.deviceType});
    }

    render() {
        const {back, list} = this.props;
        const {getFieldDecorator} = this.props.form;
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
                            {getFieldDecorator('categoryId', {
                                rules: [{required: true, message: 'Please select your gender!'}],
                            })(
                                <Select
                                    style={{width: 300}}
                                    placeholder="请选择品类"
                                    onChange={this.handleCatagoryInner}
                                >
                                    {
                                        back && back.category && back.category.map((item, i) =>
                                            <Select.Option key={i} value={item.id}>
                                                {item.name}
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
                        {/*{getFieldDecorator('id', {*/}
                        {/*rules: [{required: true, message: ''}],*/}
                        {/*})(*/}
                        {/*<Input disabled/>*/}
                        {/*)}*/}
                        {/*</FormItem>*/}

                        {/*<FormItem*/}
                        {/*label="库存量"*/}
                        {/*labelCol={{span: 5}}*/}
                        {/*wrapperCol={{span: 12}}*/}
                        {/*>*/}
                        {/*{getFieldDecorator('less', {*/}
                        {/*rules: [{required: true, message: ''}],*/}
                        {/*})(*/}
                        {/*<Input disabled/>*/}
                        {/*)}*/}
                        {/*</FormItem>*/}

                        <FormItem
                            label="保留库存"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                        >
                            {getFieldDecorator('rese', {
                                rules: [{required: true, message: ''}],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            label="选择岗位"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                        >
                            {getFieldDecorator('innerPosition', {
                                rules: [{required: true}],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{width: 300}}
                                    value={this.state.innerPosition}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    placeholder="请选择岗位"
                                    allowClear
                                    multiple
                                    treeDefaultExpandAll
                                    onChange={this.handleInnerPosition}
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
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            style={{'display': 'inline-block', 'marginLeft': '120px'}}
                        >
                            {getFieldDecorator('mark', {
                                rules: [{required: true, message: ''}],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            labelCol={{span: 5}}
                            wrapperCol={{span: 5}}
                            style={{'display': 'inline-block', 'marginLeft': '60px'}}
                        >
                            {getFieldDecorator('markflag', {valuePropName: 'checked'})(
                                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked
                                        onChange={this.onMarkChange}/>,
                            )}
                        </FormItem>

                        <FormItem
                            label="临时用机"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                        >
                            {getFieldDecorator('temp', {
                                valuePropName: 'checked',
                                rules: [{required: true, message: ''}]
                            })(
                                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked/>,
                            )}
                        </FormItem>

                        <FormItem
                            label="上传图片"
                            extra="longgggggggggggggggggggggggggggggggggg"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
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
                                        <img src={imageUrl} alt="avatar"/> :
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
                <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                    <TabPane tab="笔记本" key="NOTEBOOK">
                        {this.searchBar(back)}
                        {
                            list ?
                                <Table
                                    dataSource={list.list}
                                    columns={this.columns()}
                                    scroll={{y: 640}}
                                    onChange={this.handleTableChange}
                                    locale={{emptyText: '暂无数据'}}
                                /> :
                                <Table
                                    dataSource={list.list}
                                    columns={this.columns()}
                                    scroll={{y: 640}}
                                    locale={{emptyText: '暂无数据'}}
                                />
                        }
                    </TabPane>
                    <TabPane tab="显示器" key="MONITOR">
                        {this.searchBar(back)}
                    </TabPane>
                    <TabPane tab="主机" key="HOST">
                        {this.searchBar(back)}
                    </TabPane>
                    <TabPane tab="一体机" key="UIONMAC">
                        {this.searchBar(back)}
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
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Back)));





