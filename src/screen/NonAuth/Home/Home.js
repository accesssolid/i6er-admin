import React from 'react'
import * as AntdComponents from 'antd'
import CustomDivider from '../../../components/CustomDivider'
import { Endpoints } from '../../../utils/Endpoints'
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice'
import { QueryKeys } from '../../../utils/RTKKeys'
import CountUp from 'react-countup'
import { ReactIcons } from '../../../utils/ReactIcons'
// import UserGraph from './UserGraph'


const Home = () => {
  const { data } = useDynamicQueryQuery({
    endpoint: Endpoints.NON_AUTH.DASHBOARD_DATA,
    params: {},
    key: QueryKeys.DASHBOARD_DATA,
  }, {
    skip: false,
    refetchOnMountOrArgChange:true
  }
  )
  let dashboardData = data?.data

  const [cardArr, setCardArr] = React.useState([])
  React.useEffect(() => {
    let cardValues = dashboardData?.user_summary
    setCardArr([
      {
        title: 'Total Users',
        value: cardValues?.all_users,
        icon: <ReactIcons.DASHBOARD_ICONS.TOTAL_USERS/>,
      },
      {
        title: 'Active Users',
        value: cardValues?.active_users,
        icon: <ReactIcons.DASHBOARD_ICONS.ACTIVE_USERS/>,
      },
      {
        title: 'Deactivate Users',
        value: cardValues?.deactivated_users,
        icon: <ReactIcons.DASHBOARD_ICONS.DEACTIVATE_USERS/>,
      },
    ])
  }, [data])



  return (
    <div>
      {/* cards */}
      <AntdComponents.Row className="" gutter={[20, 20]}>
        {
          cardArr?.map((item, indx) => {
            return (
              <AntdComponents.Col xs={24} sm={24} md={12} lg={8} xl={8} key={indx}>
                <div className="bg-DarkGrey rounded-13 py-4 px-3">
                  <div className="text-start full">
                    <AntdComponents.Typography className="paragraph" >{item?.title}</AntdComponents.Typography>
                    <CustomDivider className='h-[0.8px] bg-Blue mt-3' />
                    <div className="flex items-center gap-3 mt-5 mb-6">
                      {item?.icon}
                      <AntdComponents.Typography className="font-bold titleMedium" >
                        <CountUp start={0} end={item?.value} duration={1.75} />
                      </AntdComponents.Typography>
                    </div>
                  </div>
                </div>
              </AntdComponents.Col>
            )
          })
        }
      </AntdComponents.Row>
      {/* graphs */}
      {/* <UserGraph/> */}
    </div>
  )
}

export default Home
