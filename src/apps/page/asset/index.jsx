/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {Table, Input, Button, Icon, Modal,Radio, List, Spin, Card, DatePicker, Select, Tabs, Form, TreeSelect} from 'antd';
import 'moment/locale/zh-cn'

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const defaultState = {
    goods: [],
};

class Asset extends Component {

    constructor(props) {
        super(props);
        this.state = {...defaultState};
        this.handleSelect = this.handleSelect.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.asset !== this.props.asset)
        //     this.setState({
        //         asset: nextProps.asset
        //     });

    }

    handleTab(value) {
        console.log(value);
    }

    handleSelect(e) {
        console.log(e.target.value);
    }


    componentDidMount() {
        this.props.fetchAsset();
    }

    render() {
        const {asset} = this.props;

        return (

            <div className="asset">
                <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                    <TabPane tab="笔记本" key="1">
                        <div className="find">
                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftAsset[0].code} size="large"  onChange={this.handleSelect} >
                                    <List
                                        grid={{gutter: 16, column: 3}}
                                        dataSource={asset.dftAsset}
                                        renderItem={(item,i) => (
                                            <List.Item>
                                                <Card style={{ width: 300 }}>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <RadioButton value={item.code}>{item.code}</RadioButton>
                                                </Card>
                                            </List.Item>
                                        )}
                                    /> </RadioGroup>: null
                            }

                        </div>
                    </TabPane>
                    <TabPane tab="台式机" key="2">
                        <div className="find">
                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftAsset[0].code} size="large"  onChange={this.handleSelect} >
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            dataSource={asset.dftAsset}
                                            renderItem={(item,i) => (
                                                <List.Item>
                                                    <Card style={{ width: 300 }}>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <RadioButton value={item.code}>{item.code}</RadioButton>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /> </RadioGroup>
                                    : null
                            }

                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftAsset[0].code} size="large"  onChange={this.handleSelect} >
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            dataSource={asset.dftAsset}
                                            renderItem={(item,i) => (
                                                <List.Item>
                                                    <Card style={{ width: 300 }}>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <RadioButton value={item.code}>{item.code}</RadioButton>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /> </RadioGroup>
                                    : null
                            }

                        </div>
                    </TabPane>
                    <TabPane tab="一体机" key="3">3</TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        asset: state.asset.data,
    })
};


const mapDispatchToProps = dispatch => ({
    fetchAsset: (payload) => dispatch({
        type: actionTypes.FETCH_ASSET,
    }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Asset));





