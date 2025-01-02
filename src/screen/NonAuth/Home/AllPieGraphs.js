import React from 'react'
import * as AntdComponents from 'antd'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import PieGraph from 'highcharts/highcharts-3d';
// import exporting from 'highcharts/modules/exporting';
// exporting(Highcharts);
// PieGraph(Highcharts)

const AllPieGraphs = ({ dashboardData }) => {


  const subscriptionData = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
      borderRadius: 15,
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      align: 'left'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '<b>Client:{point.y}</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Percentage',
      "data": dashboardData?.subscription_graph
    }],
    credits: {
      enabled: false, // Disable Highcharts credits
    },
  }
  const relationshipData = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
      borderRadius: 15,
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      align: 'left'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '<b>Client:{point.y}</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          // color:'{point.color}'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Percentage',
      "data": dashboardData?.relationship_type_graph
    }],
    credits: {
      enabled: false, // Disable Highcharts credits
    },
  }
  const sexualData = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
      borderRadius: 15,
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      align: 'left'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '<b>Client:{point.y}</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.y} %',
          // color:'{point.color}'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Percentage',
      "data": dashboardData?.sexual_orientation_graph
    }],
    credits: {
      enabled: false, // Disable Highcharts credits
    },
  }
  console.log('dashboardData', dashboardData, subscriptionData);
  return (
    <div>
      {/* subscription plans */}
      <div className="bg-DarkGrey rounded-13 flex flex-col lg:flex-row justify-between w-full p-5 mt-10">
        <div className="">
          <AntdComponents.Typography className='titleMedium'>Registered users subscription plans</AntdComponents.Typography>
          <AntdComponents.Typography className='paragraph font-semibold mt-2'>An overview of your users</AntdComponents.Typography>
          <div className="flex items-center gap-5">
            {
              dashboardData?.subscription_graph?.map((item, index) => {
                return (
                  <div className="flex gap-3" key={index}>
                    <AntdComponents.Typography className="h-5 w-6 rounded-sm mt-[6px]" style={{ backgroundColor: item?.color }} />
                    <div className="">
                      <AntdComponents.Typography className='titleSmall'>{item?.name}</AntdComponents.Typography>
                      <AntdComponents.Typography className='titleMedium'>{item?.y}</AntdComponents.Typography>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="">
          <HighchartsReact highcharts={Highcharts} options={subscriptionData} />
        </div>
      </div>
      {/* relationship graph */}
      <div className="bg-DarkGrey rounded-13  w-full p-5 mt-10">
        <AntdComponents.Typography className='titleMedium'>Relationship type</AntdComponents.Typography>
        <div className="flex flex-col lg:flex-row lg:justify-end me-40">
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={relationshipData} />
          </div>
          <div className="">
            {
              dashboardData?.relationship_type_graph?.map((item, index) => {
                return (
                  <div className="flex gap-3" key={index}>
                    <AntdComponents.Typography className="h-5 w-6 rounded-sm mt-[6px]" style={{ backgroundColor: item?.color }} />
                    <div className="">
                      <AntdComponents.Typography className='paragraphSmall'>{item?.name}</AntdComponents.Typography>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {/*  Sexuality type */}
      <div className="bg-DarkGrey rounded-13  w-full p-5 mt-10">
        <AntdComponents.Typography className='titleMedium'>Sexuality type</AntdComponents.Typography>
        <div className="flex flex-col lg:flex-row justify-center me-40">
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={sexualData} />
          </div>
          <div className="">
            {
              dashboardData?.sexual_orientation_graph?.map((item, index) => {
                return (
                  <div className="flex gap-3" key={index}>
                    <AntdComponents.Typography className="h-5 w-6 rounded-sm mt-[6px]" style={{ backgroundColor: item?.color }} />
                    <div className="">
                      <AntdComponents.Typography className='paragraphSmall'>{item?.name}</AntdComponents.Typography>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPieGraphs
