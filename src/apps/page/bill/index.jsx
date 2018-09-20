/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {List, Card, Col, Row} from 'antd';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";

import styles from './index.less';
import {Table, Input, Button, Icon} from 'antd';
import {DatePicker, Select} from 'antd';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
import {typeState} from '../../../config/status';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'


import breakUpNumber, {compeleteDecimal} from '../../../utils/breakUpNum';


const defaultState = {
  accountId: undefined,
  loading: false,
  startDate: '',
  endDate: ''
};
const dateFormat = 'YYYY-MM-DD';

class Bill extends Component {

  columns() {
    let array = [
      {
        title: '交易日',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
        width: 150,
        render: row => (row) || '--',
      },
      {
        title: '交易类型',
        dataIndex: 'tradeType',
        key: 'tradeType',
        width: 170,
        render: row => (row) || '--',
      },
      {
        title: '借方金额',
        dataIndex: 'debitAmount',
        key: 'debitAmount',
        width: 150,
        render: row => (row && (compeleteDecimal(breakUpNumber(row)))) || '--',
      },
      {
        title: '贷方金额',
        dataIndex: 'creditAmount',
        key: 'creditAmount',
        width: 170,
        render: row => (row && (compeleteDecimal(breakUpNumber(row)))) || '--',
      },
      {
        title: '余额',
        dataIndex: 'balance',
        key: 'balance',
        width: 150,
        render: row => (row && (compeleteDecimal(breakUpNumber(row)))) || '--',
      },
      {
        title: '摘要',
        dataIndex: 'abstracts',
        key: 'abstracts',
        width: 150,
        render: row => (row) || '--',
      },
      {
        title: '记账宝',
        dataIndex: 'companyCode',
        key: 'companyCode',
        width: 150,
        render: row => row || '--',
      },
      {
        title: '收/付方',
        dataIndex: 'accountName',
        key: 'accountName',
        width: 150,
        render: row => (row) || '--',
      },
      {
        title: '收/付方账号',
        dataIndex: 'accountId',
        key: 'accountId',
        width: 180,
        render: row => (row) || '--',
      },
      {
        title: '开户行',
        dataIndex: 'bankName',
        key: 'bankName',
        width: 170,
        render: row => (row) || '--',
      },
      {
        title: '开户行地址',
        dataIndex: 'bankLocation',
        key: 'bankLocation',
        width: 170,
        render: row => (row) || '--',
      }
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource)
      this.setState({
        dataSource: nextProps.dataSource
      });
    if (nextProps.bankList !== this.props.bankList)
      this.setState({
        bankList: nextProps.bankList
      });
  }

  onChange(date, dateString) {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
    });
    if (dateString[0] !== '' && dateString[1] !== '' && this.state.accountId) {
      this.props.fetchBill({startDate: dateString[0], endDate: dateString[1],accountId:this.state.accountId});
    } else {
      this.setState({
        dataSource: [],
      });
    }
  }

  handleChange(value) {
    this.setState({accountId: value});
    if(value && this.state.endDate!== '' && this.state.startDate!== ''){
      this.props.fetchBill({startDate: this.state.startDate, endDate: this.state.endDate,accountId:value});
    }else {
      this.setState({
        dataSource: [],
      });
    }
  }


  componentDidMount() {
    this.props.fetchBanks();
  }

  render() {

    const {dataSource, loading, bankList} = this.state;
    return (
      <div className="bill">
        <div className="find">
          <div className="bank">
            {/*<span>银行账号</span>*/}
            <Select
              style={{width: 350}}
              placeholder="请选择银行账号"
              onChange={this.handleChange}
              allowClear={true}
            >
              {
                bankList && bankList.map((item, i) =>
                  <Select.Option key={i} value={item.accountId}>
                    {item.accountId}-{item.accountName}
                  </Select.Option>
                )
              }
            </Select>
          </div>
          <div className="bank">
            {/*<span>日期</span>*/}
            <RangePicker
              style={{width: 300}}
              onChange={this.onChange}
              locale={locale}
              format={dateFormat}
            />
          </div>
        </div>
        {
          dataSource ?
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={this.columns()}
            scroll={{y: 640}}
            pagination={{pageSize: 50}}
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
    dataSource: state.bill.data,
    bankList: state.bank.data,
    loading: state.bill.isFetching,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchBill: (payload) => dispatch({
    type: actionTypes.FETCH_BILL,
    payload
  }),
  fetchBanks: (payload) => dispatch({
    type: actionTypes.FETCH_BANKS,
    payload
  }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bill));





