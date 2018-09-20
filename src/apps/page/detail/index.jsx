/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";

import styles from './index.less';
import {Table, Input, Button, Icon,Modal,Spin} from 'antd';
import {DatePicker, Select} from 'antd';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
import {channel, checkType} from '../../../config/status';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'

const Search = Input.Search;

// const startDateInit = moment().format('YYYYMM01');
// const endDateInit = moment().format('YYYYMMDD');

const defaultState = {
  appId: undefined,
  merchantNo: undefined,
  loading: false,
  pagination: {},
  startDate: '',
  endDate: '',
  downloadList: true,
  enableDown: true
};
const dateFormat = 'YYYY-MM-DD';

class Detail extends Component {

  columns() {
    let array = [
      {
        title: '交易时间',
        dataIndex: 'outTransTime',
        key: 'outTransTime',
        width: 150,
        render: row => moment(row).format('YYYY-MM-DD HH:mm:ss')
        ,
      },
      {
        title: '商户订单号',
        dataIndex: 'instructId',
        key: 'instructId',
        width: 150,
      },
      {
        title: '第三方订单号',
        dataIndex: 'outOrderId',
        key: 'outOrderId',
        width: 250,
      },
      {
        title: '总金额',
        dataIndex: 'bizAmt',
        key: 'bizAmt',
        width: 100,
      },
      {
        title: '手续费',
        dataIndex: 'commissionFeeAmt',
        key: 'commissionFeeAmt',
        width: 100,
      },
      {
        title: '摘要',
        dataIndex: 'productInfo',
        key: 'productInfo',
        width: 100,
      },
      {
        title: '交易类型',
        dataIndex: 'checkType',
        key: 'checkType',
        width: 100,
        render: row => checkType(row)
      }
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downloadDetail = this.downloadDetail.bind(this);
    this.downloadStatus = this.downloadStatus.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleMerchantsChange = this.handleMerchantsChange.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource)
      this.setState({
        dataSource: nextProps.dataSource
      });
    if (nextProps.ddetail !== this.props.ddetail)
      this.setState({
        ddetail: nextProps.ddetail
      });
    if (nextProps.appList !== this.props.appList)
      this.setState({
        appList: nextProps.appList
      });
    if (nextProps.merchantsList !== this.props.merchantsList)
      this.setState({
        merchantsList: nextProps.merchantsList
      });
  }

  onChange(date, dateString) {
    if (moment.duration(moment(dateString[1]) - moment(dateString[0])).asDays() > 31) {
      this.setState({
        enableDown: false,
      });
      return Modal.error({
        title: '日期范围不能超过31天',
        content: '',
      });
    }
    this.setState({
      enableDown: true,
    });
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
      ddetail: null,
    });
    if (this.state.merchantNo && dateString[0] !== '' && dateString[1] !== '') {
      this.props.fetchDetail({startDate: dateString[0], endDate: dateString[1], page: 1,merchantNo: this.state.merchantNo});
    } else {
      this.setState({
        dataSource: [],
      });
    }

  }

  downloadStatus(ddetail) {
    if (!ddetail) return;
    if (ddetail.exportStatus === 'NONE')
      return (
        <Modal
          title="下载列表"
          visible={this.state.downloadList}
          onCancel={() => {
            this.setState({downloadList: false})
          }}
        >
          无账单
        </Modal>
      )
    if (ddetail.exportStatus === 'DONE')
      return (
        <Modal
          title="下载列表"
          visible={this.state.downloadList}
          onCancel={() => {
            this.setState({downloadList: false})
          }}
        >
          <ul>
            {
              ddetail.files.split(',').map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      href={item}>{item.split('/')[item.split('/').length-1]}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </Modal>
      )
  }

  downloadDetail() {
    if (!this.state.startDate || !this.state.endDate) {
      Modal.error({
        title: '未选择时间',
        content: '',
      });
      return
    }

    if (!this.state.merchantNo) {
      Modal.error({
        title: '未填写商户号',
        content: '',
      });
      return
    }
    this.setState({ downloadList: true,downState: true});
    this.props.fetchDdetail({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      merchantNo: this.state.merchantNo
    });

  }

  handleTableChange(pagination) {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.props.fetchDetail({startDate: this.state.startDate, endDate: this.state.endDate, page: pager.current,merchantNo:this.state.merchantNo});
  }


  handleChange(value) {
    this.setState({appId: value, ddetail: null,merchantNo: null});
    this.props.fetchMerchants({appId: value});
  }

  handleMerchantsChange(value) {
    this.setState({merchantNo: value, ddetail: null});
    if (value && this.state.startDate !== '' && this.state.endDate !== '') {
      this.props.fetchDetail({startDate: this.state.startDate, endDate: this.state.endDate, page: 1,merchantNo: value});
    }
  }

  componentDidMount() {
    this.props.fetchApps();
  }

  render() {
    const suffix = <Icon type="close-circle" />;
    const {dataSource, loading,appList, merchantsList,ddetail} = this.state;

    return (
      <div className="detail">
        <div className="find">
          <div className="bank">
            {/*<span>业务</span>*/}
            <Select
              style={{width: 220}}
              placeholder="请选择业务"
              value={this.state.appId}
              onChange={this.handleChange}
              allowClear={true}
            >
              {
                // appList && appList.list.filter((item)=>{
                //   return item.appId.toString().indexOf("88")!==-1
                // })
                appList && appList.list.map((item, i) =>
                  <Select.Option key={i} value={item.appId}>
                    {item.appName}({item.appId})
                  </Select.Option>
                )
              }
            </Select>
          </div>
          <div className="bank">
            {/*<span>商户</span>*/}
            <Select
              style={{width: 200}}
              placeholder="请选择商户"
              value={this.state.merchantNo}
              onChange={this.handleMerchantsChange}
              allowClear={true}
            >
              {
                merchantsList && merchantsList.list.map((item, i) =>
                  <Select.Option key={i} value={item.merchantNo}>
                    {item.merchantNo}-{channel(item.agencyCode)}
                  </Select.Option>
                )
              }
            </Select>
          </div>
          <div className="bank">
            <RangePicker
              onChange={this.onChange}
              locale={locale}
              format={dateFormat}
              ranges={{ '上个月': [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')] }}
            />
          </div>
          <div className="bank none">
            <Button disabled={!this.state.enableDown} type="primary" icon="download"
                    onClick={this.downloadDetail}>下载</Button>
          </div>
          <div className="bank">
            {
              ddetail && (ddetail.exportStatus !== 'DONE' && ddetail.exportStatus !== 'NONE') ?
                <div><Spin/>下载中</div> : null
            }
          </div>
          {
            this.downloadStatus(ddetail)
          }
        </div>
        {
          dataSource ?
          <Table
            dataSource={dataSource.list}
            loading={loading}
            columns={this.columns()}
            pagination={{pageSize: dataSource.pageSize, current: dataSource.page, total: dataSource.total}}
            scroll={{y: 640}}
            onChange={this.handleTableChange}
            locale={{emptyText: '暂无数据'}}
          />:
          <Table
          dataSource={null}
          loading={loading}
          columns={this.columns()}
          scroll={{y: 640}}
          locale={{emptyText: '暂无数据'}}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    dataSource: state.detail.data,
    appList: state.apps.data,
    merchantsList: state.merchants.data,
    loading: state.detail.isFetching,
    ddetail: state.ddetail.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchDetail: (payload) => dispatch({
    type: actionTypes.FETCH_DETAIL,
    payload
  }),
  fetchApps: (payload) => dispatch({
    type: actionTypes.FETCH_APPS,
    payload
  }),
  fetchMerchants: (payload) => dispatch({
    type: actionTypes.FETCH_MERCHANTS,
    payload
  }),
  fetchDdetail: (payload) => dispatch({
    type: actionTypes.FETCH_DDETAIL,
    payload
  }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));





