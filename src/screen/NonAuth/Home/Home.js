import React from 'react'
import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from '../../../utils/StaticImages'
import CustomDivider from '../../../components/CustomDivider'
import { Endpoints } from '../../../utils/Endpoints'
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice'
import { QueryKeys } from '../../../utils/RTKKeys'
import CountUp from 'react-countup'
import UserGraph from './UserGraph'
import AllPieGraphs from './AllPieGraphs'


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
    let cardValues = dashboardData?.user_table
    setCardArr([
      {
        id: 'total_users',
        title: 'Total Users',
        value: cardValues?.total_users,
        icon: STATIC_IMAGES.DASHBOARD.USERS,
      },
      {
        id: 'men',
        title: 'Men',
        value: cardValues?.men,
        icon: STATIC_IMAGES.DASHBOARD.MEN,
      },
      {
        id: 'woman',
        title: 'Women',
        value: cardValues?.women,
        icon: STATIC_IMAGES.DASHBOARD.WOMEN,
      },
      {
        id: 'non_binary',
        title: 'Non binary',
        value: cardValues?.non_binary,
        icon: STATIC_IMAGES.DASHBOARD.NON_BINARY,
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
              <AntdComponents.Col xs={24} sm={24} md={12} lg={6} xl={6} key={indx}>
                <div className="bg-DarkGrey rounded-13 py-4 px-3">
                  <div className="text-start full">
                    <AntdComponents.Typography className="paragraph" >{item?.title}</AntdComponents.Typography>
                    <CustomDivider className='h-[0.8px] bg-Grey mt-3' />
                    <div className="flex items-center gap-3 mt-5 mb-6">
                      <AntdComponents.Avatar src={item?.icon} size={50} />
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
      <UserGraph/>
      <AllPieGraphs dashboardData={data?.data} />
    </div>
  )
}

export default Home
