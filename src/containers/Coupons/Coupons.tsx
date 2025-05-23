import React, {useCallback, useContext, useState} from 'react';
import Moment from 'react-moment';
import { withStyle, createThemedUseStyletron } from 'baseui';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { Plus } from '../../components/AllSvgIcon';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
  ProgressWrapper,
  ProgressText,
  Status,
} from './Coupon.style';
import NoResult from '../../components/NoResult/NoResult';
import {DrawerContext} from "../../context/DrawerContext";

const GET_COUPONS = gql`
  query getCoupons($status: String, $searchBy: String) {
    coupons(status: $status, searchBy: $searchBy) {
      id
      title
      code
      number_of_used_coupon
      number_of_coupon
      expiration_date
      creation_date
      status
    }
  }
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

const statusSelectOptions = [
  { value: 'active', label: 'Active' },
  { value: 'revoked', label: 'Revoked' },
];

export default function Coupons() {
  const {drawerDispatch: dispatch} = useContext(DrawerContext);
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CAMPAING_FORM' }),
    [dispatch]
  );
  const [status, setStatus] = useState([]);
  const [search, setSearch] = useState('');
  const [useCss, theme] = themedUseStyletron();
  const active = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const revoked = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });

  const { data, error, refetch } = useQuery(GET_COUPONS);
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  function handleSelect({ value }) {
    setStatus(value);
    if (value.length) {
      refetch({ status: value[0].value, searchBy: search });
    } else {
      refetch({ status: null });
    }
  }

  function handleSearch(event) {
    const value = event.currentTarget.value;

    setSearch(value);
    refetch({
      status: status.length ? status[0].value : null,
      searchBy: value,
    });
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.coupons.map(coupon => coupon.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }

  const numberToPercent = (num, total) => {
    return (num * 100) / total;
  };

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 5px rgba(0, 0 ,0, 0.05)',
            }}
          >
            <Col md={2}>
              <Heading>Campaigns</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={3}>
                  <Select
                    options={statusSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    placeholder='Status'
                    value={status}
                    searchable={false}
                    onChange={handleSelect}
                  />
                </Col>

                <Col md={5}>
                  <Input
                    value={search}
                    placeholder='Ex: Search By Name'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme, $size, $shape }) => {
                          return {
                            width: '100%',
                            borderTopLeftRadius: '3px',
                            borderTopRightRadius: '3px',
                            borderBottomLeftRadius: '3px',
                            borderBottomRightRadius: '3px',
                          };
                        },
                      },
                    }}
                  >
                    Create Campaign
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) minmax(70px, 70px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)'>
                <StyledHeadCell>
                  <Checkbox
                    type='checkbox'
                    value='checkAll'
                    checked={checked}
                    onChange={onAllCheck}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderWidth: '2px',
                          borderRadius: '4px',
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Campaigns Name</StyledHeadCell>
                <StyledHeadCell>Code</StyledHeadCell>
                <StyledHeadCell>Remaining coupon</StyledHeadCell>
                <StyledHeadCell>Expiration Date</StyledHeadCell>
                <StyledHeadCell>Creation Date</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {data ? (
                  data.coupons.length ? (
                    data.coupons
                      .map(item => Object.values(item))
                      .map((row, index) => {
                        return (
                          <React.Fragment key={index}>
                            <StyledBodyCell>
                              <Checkbox
                                name={row[0]}
                                checked={checkedId.includes(row[0])}
                                onChange={handleCheckbox}
                                overrides={{
                                  Checkmark: {
                                    style: {
                                      borderWidth: '2px',
                                      borderRadius: '4px',
                                    },
                                  },
                                }}
                              />
                            </StyledBodyCell>
                            <StyledBodyCell>{row[0]}</StyledBodyCell>
                            <StyledBodyCell>{row[1]}</StyledBodyCell>
                            <StyledBodyCell>{row[2]}</StyledBodyCell>
                            <StyledBodyCell>
                              <ProgressWrapper>
                                <ProgressBar
                                  value={numberToPercent(row[3], row[4])}
                                  successValue={100}
                                  overrides={{
                                    Bar: {
                                      style: () => {
                                        return {
                                          backgroundColor: '#F2F2F2',
                                          marginLeft: '0px',
                                          marginRight: '0px',
                                          height: '4px',
                                          borderTopLeftRadius: '5px',
                                          borderTopRightRadius: '5px',
                                          borderBottomLeftRadius: '5px',
                                          borderBottomRightRadius: '5px',
                                          position: 'relative',
                                        };
                                      },
                                    },
                                    BarProgress: {
                                      style: ({ $theme }) => {
                                        return {
                                          backgroundColor:
                                            $theme.colors.primary,
                                          borderTopLeftRadius: '5px',
                                          borderTopRightRadius: '5px',
                                          borderBottomLeftRadius: '5px',
                                          borderBottomRightRadius: '5px',
                                        };
                                      },
                                    },
                                  }}
                                />

                                <ProgressText>{`${row[3] ? row[3] : 0} of ${
                                  row[4]
                                } codes remaining`}</ProgressText>
                              </ProgressWrapper>
                            </StyledBodyCell>
                            <StyledBodyCell>
                              <Moment format='Do MMM YYYY'>{row[5]}</Moment>
                            </StyledBodyCell>
                            <StyledBodyCell>
                              <Moment format='Do MMM YYYY'>{row[6]}</Moment>
                            </StyledBodyCell>
                            <StyledBodyCell>
                              <Status
                                className={
                                  row[7] === 'active'
                                    ? active
                                    : row[7] === 'revoked'
                                    ? revoked
                                    : ''
                                }
                              >
                                {row[7]}
                              </Status>
                            </StyledBodyCell>
                          </React.Fragment>
                        );
                      })
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
