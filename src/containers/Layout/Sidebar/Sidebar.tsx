import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
import {
  DASHBOARD,
  PRODUCTS,
  PURCHASES,
    SHIPMENTS,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from '../../../settings/constants';
import { AuthContext } from '../../../context/auth';
import {
  DashboardIcon,
  ProductIcon,
  SidebarCategoryIcon,
  OrderIcon,
  CustomerIcon,
  CouponIcon,
  SettingIcon,
  LogoutIcon,
  PencilIcon,
} from '../../../components/AllSvgIcon';

const sidebarMenus = [
  {
    name: 'Dashboard',
    path: DASHBOARD,
    exact: true,
    isAdmin: 1,
    icon: <DashboardIcon />,
  },
  {
    name: 'Products',
    path: PRODUCTS,
    exact: false,
    isMerchant: 1,
    icon: <ProductIcon />,
  },
  {
    name: 'Purchasing',
    path: PURCHASES,
    exact: false,
    isAdmin: 1,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: 'Shipments',
    path: SHIPMENTS,
    exact: false,
    isAdmin: 1,
    icon: <PencilIcon />,
  },
  {
    name: 'Orders',
    path: ORDERS,
    exact: false,
    isAdmin: 1,
    icon: <OrderIcon />,
  },
  {
    name: 'Customers',
    path: CUSTOMERS,
    exact: false,
    isAdmin: 1,
    icon: <CustomerIcon />,
  },
  {
    name: 'Coupons',
    path: COUPONS,
    exact: false,
    isAdmin: 1,
    icon: <CouponIcon />,
  },
  {
    name: 'Settings',
    path: SETTINGS,
    exact: false,
    isAdmin: 1,
    icon: <SettingIcon />,
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { signout, isMerchant, isAdmin } = useContext(AuthContext);
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((menu: any, index: number) => (
          <>
          {isMerchant && menu.isMerchant &&
            <NavLink
              to={menu.path}
              key={index}
              exact={menu.exact}
              activeStyle={{
                color: '#00C58D',
                backgroundColor: '#f7f7f7',
                borderRadius: '50px 0 0 50px',
              }}
              onClick={onMenuItemClick}
            >
              {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
              {menu.name}
            </NavLink>}
          {isAdmin && menu.isAdmin &&
            <NavLink
              to={menu.path}
              key={index}
              exact={menu.exact}
              activeStyle={{
                color: '#00C58D',
                backgroundColor: '#f7f7f7',
                borderRadius: '50px 0 0 50px',
              }}
              onClick={onMenuItemClick}
            >
              {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
              {menu.name}
            </NavLink>}
        </>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          signout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
