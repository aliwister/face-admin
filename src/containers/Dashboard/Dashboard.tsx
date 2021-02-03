import React from 'react';
import { styled } from 'baseui';
import { Grid, Row, Col as Column } from '../../components/FlexBox/FlexBox';

import {WorkItems} from "./WorkItems";

const Col = styled(Column, props => ({
  '@media only screen and (max-width: 574px)': {
    marginBottom: '30px',

    ':last-child': {
      marginBottom: 0,
    },
  },

  '@media only screen and (max-width: 990px)': {
    marginBottom: props.className === 'mb-30' ? '30px' : '0',
  },
}));

const Dashboard = () => (
  <Grid fluid={true}>
    <Row>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FDubai&amp;src=YmFkYWxzLmNvbV9ocDFucDAzM2k2bmFvaGc3c2tpZ3U2c3Azc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4ub20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%230B8043&amp;color=%23F4511E&amp;color=%23B39DDB&amp;color=%23F6BF26"
        width="800" height="600" frameBorder="0" scrolling="no"></iframe>
    </Row>
    <h3>Returns</h3>
    <Row>
      <WorkItems type={"returnWorkflow"} showDone={false} showMine={true}/>
    </Row>
    <h3>Refunds</h3>
    <Row>
      <WorkItems type={"refundWorkflow"} showDone={false} showMine={true}/>
    </Row>
{/*    <Row>
      <Col md={5} lg={4} sm={6}>
        <RadialBarChart
          widgetTitle='Target'
          series={[43, 75]}
          label={['$1,342', '$8,908']}
          colors={['#03D3B5', '#666d92']}
          helperText={['Weekly Targets', 'Monthly Targets']}
        />
      </Col>
      <Col md={7} lg={8} sm={6}>
        <LineChart
          widgetTitle='User Hit Rate'
          color={['#03D3B5']}
          categories={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          seriesName='Unique visitors'
          series={[200, 150, 430, 320, 600, 468, 309, 500, 273, 370, 260, 180]}
        />
      </Col>
    </Row>

    <Row>
      <Col lg={3} sm={6} xs={12} className='mb-30'>
        <StickerCard
          title='Total Revenue'
          subtitle='(Last 30 Days)'
          icon={<CoinIcon />}
          price='$711.66'
          indicator='up'
          indicatorText='Revenue up'
          note='(previous 30 days)'
          link='#'
          linkText='Full Details'
        />
      </Col>
      <Col lg={3} sm={6} xs={12} className='mb-30'>
        <StickerCard
          title='Total Order'
          subtitle='(Last 30 Days)'
          icon={<CartIconBig />}
          price='88,568'
          indicator='down'
          indicatorText='Order down'
          note='(previous 30 days)'
          link='#'
          linkText='Full Details'
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title='New Customer'
          subtitle='(Last 30 Days)'
          icon={<UserIcon />}
          price='5,678'
          indicator='up'
          indicatorText='Customer up'
          note='(previous 30 days)'
          link='#'
          linkText='Full Details'
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title='Total Delivery'
          subtitle='(Last 30 Days)'
          icon={<DeliveryIcon />}
          price='78,000'
          indicator='up'
          indicatorText='Delivery up'
          note='(previous 30 days)'
          link='#'
          linkText='Full Details'
        />
      </Col>
    </Row>

    <Row>
      <Col md={7} lg={8}>
        <GraphChart
          widgetTitle='Sales From Social Media'
          colors={['#03D3B5']}
          series={[25, 30, 14, 30, 55, 60, 48]}
          labels={[
            '2019-05-12',
            '2019-05-13',
            '2019-05-14',
            '2019-05-15',
            '2019-05-16',
            '2019-05-17',
            '2019-05-18',
          ]}
        />
      </Col>

      <Col md={5} lg={4}>
        <DonutChart
          widgetTitle='Target'
          series={[30634, 6340]}
          labels={['Todays Revenue', 'Todays Refund']}
          colors={['#03D3B5', '#666d92']}
          helperText={['Weekly Targets', 'Monthly Targets']}
          icon={[<Revenue />, <Refund />]}
          prefix='$'
        />
      </Col>
    </Row>

    <Row>
      <Col md={12} lg={12}>
        <ColumnChart
          widgetTitle='Sale History'
          colors={['#03D3B5']}
          prefix='$'
          totalValue='1,92,564'
          position='up'
          percentage='1.38%'
          text='More than last year'
          series={[44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]}
          categories={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
        />
      </Col>
    </Row>
    <Row>
      <Col md={5} lg={4}>
        <GradiantGraphChart
          colors={['#03D3B5']}
          series={[25, 30, 14, 30, 55, 60, 48]}
          labels={[
            '2019-05-12',
            '2019-05-13',
            '2019-05-14',
            '2019-05-15',
            '2019-05-16',
            '2019-05-17',
            '2019-05-18',
          ]}
          topRowTitle='Performance'
          bottomRowData={[
            {
              label: 'Last Week Profit',
              valueText: '+29.7%',
              value: 29.7,
              color: '#03D3B5',
            },
            {
              label: 'This Week Losses',
              valueText: '-53.4%',
              value: 53.4,
              color: '#FC747A',
            },
          ]}
        />
      </Col>

      <Col md={7} lg={8}>
        <MapWidget
          data={[
            {
              name: 'Williamburgs',
              value: 69922,
              color: '#2170FF',
            },
            {
              name: 'Brooklyn',
              value: 41953,
              color: '#29CAE4',
            },
            {
              name: 'New York',
              value: 23307,
              color: '#666D92',
            },
            {
              name: 'Jersey City',
              value: 20200,
              color: '#03D3B5',
            },
          ]}
          totalText='Total Client'
        />
      </Col>
    </Row>*/}
  </Grid>
);

export default Dashboard;
