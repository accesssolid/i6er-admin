import React from 'react'
import * as AntdComponents from 'antd'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { Endpoints } from '../../../utils/Endpoints';
import { QueryKeys } from '../../../utils/RTKKeys';
import { useDynamicQueryQuery } from '../../../redux/service/apiSlice';
import { ReactIcons } from '../../../utils/ReactIcons';
// import dayjs from 'dayjs';
import moment from 'moment';
// Initialize the accessibility module
// HighchartsAccessibility(Highcharts);

const { RangePicker } = AntdComponents.DatePicker;

const UserGraph = () => {
    // const todayDate = dayjs()
    const [filterDate, setFilterDate] = React.useState()
    const [dropdownValue, setDropdownValue] = React.useState('1M')
    const [xAxis, setXAxis] = React.useState([])
    const [totalUserCount, setTotalUserCount] = React.useState([])
    const [activeUserCount, setActiveUserCount] = React.useState([])
    // graphData
    const { data } = useDynamicQueryQuery({
        endpoint: Endpoints.NON_AUTH.USER_GRAPH,
        params: { past_day: dropdownValue, ...(filterDate?.[0]&&filterDate?.[1]?{start_time: moment(filterDate?.[0])?.unix(), end_time: moment(filterDate?.[1])?.unix()}:{}) },
        key: QueryKeys.USER_GRAPH_DATA,
    }, {
        skip: false,
        refetchOnMountOrArgChange: true
    })
    function convertData(arr) {
        console.log('arr>>', arr);
        let counts = []
        let xAxisData = []
        arr?.map((item) => {
            if (dropdownValue == "1Y") {
                xAxisData.push(moment(item?.date).format("MMMM"))
            } else if (dropdownValue == "7D") {
                xAxisData.push(moment(item?.date).format("dddd"))
            } else if (dropdownValue == "1M") {
                xAxisData.push(moment(item?.date).format("MM/DD/YYYY"))
            } else {
                xAxisData.push(moment(item?.date).format("MM/DD/YYYY"))
            }
            counts.push(item?.count)
        })
        return { counts, xAxisData }
    }

    React.useEffect(() => {
        let { counts: activeCounts, xAxisData: activeXAxis } = convertData(data?.data?.activeUsers)
        let { counts: totalCounts, xAxisData: totalXAxis } = convertData(data?.data?.totalUsers)
        console.log('>>>', totalXAxis, activeCounts);
        setXAxis(activeXAxis)
        setTotalUserCount(totalCounts)
        setActiveUserCount(activeCounts)
    }, [data])

    const options = {
        chart: {
            type: 'area',
            borderRadius: 15,
            spacing: [10, 10, 10, 10],
            width: null,
            backgroundColor: 'var(--darkGrey)',

        },
        title: { text: '' },
        xAxis: {
            categories: xAxis,
            accessibility: {
                description: 'Months of the year'
            },
            lineColor: 'var(--green)',
            labels: {
                style: {
                    color: 'var(--defaultWhiteColor)',
                    fontSize: '0.9rem'
                }
            },
        },
        plotOptions: {
            area: {
                lineWidth: 2,
                marker: {
                    lineWidth: 1,
                },
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },
        yAxis: {
            title: { text: '' },
            labels: {
                format: '{value}',
                style: {
                    color: 'var(--defaultWhiteColor)',
                    fontSize: '0.9rem',
                }
            }
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [
            {
                name: 'Active Users',
                data: activeUserCount,  // Clone the array
                lineColor: 'var(--blue)',
                fillColor: 'rgba(51, 126, 243, 0.1)',
                marker: {
                    lineWidth: 2,
                    lineColor: 'var(--blue)',
                    fillColor: '#fff'
                },
            },
            {
                name: 'Total Users',
                data: totalUserCount,  // Clone the array
                lineColor: 'var(--pink)',
                fillColor: 'rgba(249, 62, 153, 0.05)',
                marker: {
                    lineWidth: 2,
                    lineColor: 'var(--golden)',
                    fillColor: '#fff'
                },
            },
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 900
                },
                chartOptions: {
                    yAxis: {
                        labels: {
                            style: { fontSize: '0.8rem' }
                        }
                    },
                    xAxis: {
                        labels: {
                            style: { fontSize: '0.8rem' }
                        }
                    },
                    chart: {
                        spacing: [5, 5, 5, 5]
                    },
                }
            }]
        }
    };

    console.log('totalUserCount', totalUserCount, activeUserCount);

    return (
        <div className='bg-DarkGrey rounded-10 p-5 mt-5'>
            <div className="flex justify-between">
                <div className="">
                    <AntdComponents.Typography className='titleSmall'>Users</AntdComponents.Typography>
                    <div className="flex items-center gap-8">
                        <div className="">
                            <AntdComponents.Typography className='paragraphSmall'>Total Users</AntdComponents.Typography>
                            <AntdComponents.Typography className='titleSmall text-Pink'>7854</AntdComponents.Typography>
                        </div>
                        <div className="">
                            <AntdComponents.Typography className='paragraphSmall'>Active Users</AntdComponents.Typography>
                            <AntdComponents.Typography className='titleSmall text-Blue'>6784</AntdComponents.Typography>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center ${dropdownValue!='CUSTOM'&&'justify-end'} gap-5 rangePicker`}>
                    {
                        dropdownValue === 'CUSTOM' &&
                        <RangePicker className='input-box rangePicker text-White' onChange={(e, dateString) => { setFilterDate(dateString) }
                        } />
                    }
                    <AntdComponents.Select
                        value={dropdownValue}
                        onChange={(value) => setDropdownValue(value)}
                        className='input-box mt-4 md:mt-0 w-full md:w-64'
                        popupClassName='border-2 border-Blue p-0'
                        suffixIcon={<ReactIcons.ArrowDownIcon />}
                        options={[
                            {
                                value: '1Y',
                                label: 'Annually'
                            },
                            {
                                value: '7D',
                                label: 'Weekly'
                            },
                            {
                                value: '1M',
                                label: 'Monthly'
                            },
                            {
                                value: 'CUSTOM',
                                label: 'Custom'
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="mt-10">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ className: 'areaChart' }}
                />
            </div>
        </div>
    )
}

export default UserGraph