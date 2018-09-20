/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
import './index.less';
import menus from '../../../config/menus'
import {Affix} from 'antd';


class SiderMenu extends Component {

  constructor(props) {
    super(props);
  }

  getNavMenuItems(menus) {
    return (
      <Menu>
        {
          menus && menus.map((item, i) =>
            <Menu.Item key={item.key}>
              <Link
                to={'/' + item.key}
              >
                {/*<Icon type={item.type}/>*/}
                <span>{item.content}</span>
              </Link>
            </Menu.Item>
          )
        }
      </Menu>

    )
  };

  render() {
    const {location} = this.props;
    return (
        <Menu
          inlineIndent="40"
          className="aside-container menu-site"
          mode="inline"
          defaultSelectedKeys={['/month']}
          selectedKeys={[location.pathname.slice(1,location.pathname.length)]}
        >
          {this.getNavMenuItems(menus)}
        </Menu>
    );
  }
}


export default withRouter(SiderMenu);
