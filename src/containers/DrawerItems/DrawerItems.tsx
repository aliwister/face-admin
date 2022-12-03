import React, {useCallback, useContext} from 'react';
import { styled } from 'baseui';
import Drawer from '../../components/Drawer/Drawer';
import { CloseIcon } from '../../components/AllSvgIcon';

/** Drawer Components */
import StubProductForm from '../ProductForm/StubProductForm';
import CustomProductForm from '../ProductForm/CustomProductForm';
import ProductUpdateForm from '../ProductForm/ProductUpdateForm';
import CampaingForm from '../CampaingForm/CampaingForm';
import CategoryForm from '../CategoryForm/CategoryForm';
import StaffMemberForm from '../StaffMemberForm/StaffMemberForm';
import Sidebar from '../Layout/Sidebar/Sidebar';
import {DrawerContext} from "../../context/DrawerContext";

/** Components Name Constants */
const DRAWER_COMPONENTS = {
  PRODUCT_FORM: CustomProductForm,
  STUB_PRODUCT_FORM: StubProductForm,
  PRODUCT_UPDATE_FORM: CustomProductForm,
  CAMPAING_FORM: CampaingForm,
  CATEGORY_FORM: CategoryForm,
  STAFF_MEMBER_FORM: StaffMemberForm,
  SIDEBAR: Sidebar,
};

const CloseButton = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: '0',
  border: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '10px',
  left: '-30px',
  right: 'auto',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '@media only screen and (max-width: 767px)': {
    left: 'auto',
    right: '30px',
    top: '29px',
  },
}));

export default function DrawerItems() {
  const {drawerDispatch: dispatch} = useContext(DrawerContext);
  const {drawerState} = useContext(DrawerContext);

  const isOpen = drawerState['isOpen'];
  const drawerComponent = drawerState['drawerComponent'];
  const data = drawerState['data'];
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex:
              DRAWER_COMPONENTS[drawerComponent] ===
              DRAWER_COMPONENTS.STAFF_MEMBER_FORM
                ? 0
                : 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '70vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width='6px' height='6px' />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
