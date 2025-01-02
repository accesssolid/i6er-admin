import * as AntdComponents from 'antd'
import React from 'react'
import { SidebarList } from './SidebarList';
import { Outlet, useNavigate } from 'react-router-dom';
import { STATIC_IMAGES } from '../utils/StaticImages';
import { ReactIcons } from '../utils/ReactIcons';
import { RouterKeys } from '../Routes/RouterKeys';
import { LogoutAction } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import CustomDivider from '../components/CustomDivider';
const { Header, Sider, Content } = AntdComponents.Layout;

const MainLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = React.useState(RouterKeys.NON_Auth.HOME);


  // Setting Active sider
  React.useEffect(() => {
    const pathWithoutQuery = location.pathname.split('?')[0]; // Remove query parameters
    // Define a map of paths to active indexes
    const pathToIndexMap = {
      [`${RouterKeys.NON_Auth.HOME}`]: `${RouterKeys.NON_Auth.HOME}`,
      [`${RouterKeys.NON_Auth.USER_Detail}`]: `${RouterKeys.NON_Auth.USERS}`,
      [`${RouterKeys.NON_Auth.CATEGORY_DETAIL}`]: `${RouterKeys.NON_Auth.CATEGORY}`,
      [`${RouterKeys.NON_Auth.COMMUNITY_DETAIL}`]: `${RouterKeys.NON_Auth.COMMUNITY}`,
      [`${RouterKeys.NON_Auth.REPORT_POST_DETAIL}`]: `${RouterKeys.NON_Auth.REPORT_POST}`,
      [`${RouterKeys.NON_Auth.REPORT_COMMENTS_DETAIL}`]: `${RouterKeys.NON_Auth.REPORT_COMMENTS}`,
    };

    // Check for a direct match in the map
    if (pathToIndexMap[pathWithoutQuery]) {
      setActiveIndex(pathToIndexMap[pathWithoutQuery]);
    } else {
      // Fallback to the pathname if no match is found
      setActiveIndex(pathWithoutQuery);
    }
  }, [location.pathname]);

  const handleMenuClick = (route) => {
    setActiveIndex(route);
  };
  const popOverContent = (
    <>
      <div role='button' tabIndex={0} className="bg-Black rounded-10 py-2"
      >
        <AntdComponents.Typography className="text-para text-White px-3 py-2" onClick={()=>navigate(RouterKeys.NON_Auth.CHANGE_PASSWORD)}>Change password</AntdComponents.Typography>
        <CustomDivider className='h-[0.5px] bg-Grey' />
        <AntdComponents.Typography className="text-para text-White px-3 py-2" onClick={() => logoutHandle()}>Logout</AntdComponents.Typography>
      </div>
    </>
  );
  const logoutHandle = () => {
    navigate('/')
    dispatch(LogoutAction())
  }
  return (
    <div>
      <AntdComponents.Layout>
        <Header className='h-24'>
          <div className="flex items-center justify-between m-auto" style={{ height: '100%' }}>
            <div className="">
              <AntdComponents.Image preview={false} src={STATIC_IMAGES.LOGO} alt="logo" height={50} width={'auto'} role='button' onClick={()=>navigate(RouterKeys.NON_Auth.HOME)}/>
            </div>
            <div className="">
              <AntdComponents.Popover content={popOverContent} arrow={false}>
                <div className="flex items-center justify-between px-5 border-2 border-Purple rounded-5 h-12 " style={{ cursor: 'pointer' }}>
                  <AntdComponents.Typography className="text-White font-Poppins font-bold">Admin</AntdComponents.Typography>
                  <ReactIcons.ArrowDownIcon size={25} color="" style={{ marginLeft: 8 }} />
                </div>
              </AntdComponents.Popover>
            </div>
          </div>
        </Header>
        <AntdComponents.Layout className=''>
          <Sider width="15%" style={{ maxHeight: 'calc(100vh - 6rem)' }} className='shadow-sideShadow bg-Black overflow-y-auto mt-1'>
            <AntdComponents.Menu
              mode="inline"
              selectable={true}
              selectedKeys={[activeIndex]}
              defaultSelectedKeys={[RouterKeys.NON_Auth.HOME]}
              theme='dark'
            >
              {
                SidebarList?.map((item, index) => {
                  const isActive = activeIndex === item.routes;
                  return (
                    <>
                      <div key={item?.title}
                        className={`${isActive && 'border border-Pink'}`}>
                        <div className={`${isActive && 'border border-Purple'}`}>
                          {
                            item?.type == 'subMenu' ?
                              <AntdComponents.Menu.SubMenu title={<div className="side_menu_tab px-5 flex items-center gap-3 text-White" style={{ color: '#000' }}>
                                <span>
                                  {item.icon}
                                </span>
                                <span className='hidden md:block mb-2'>
                                  {item?.title}
                                </span>
                              </div>}  >
                                {
                                  item?.submenus?.map((data, key) => {
                                    const isActive2 = activeIndex === data.routes;
                                    console.log('isActive2', isActive2);

                                    return (
                                      <>
                                        <div key={data?.title} className=''>
                                          <div className={`${isActive2 && 'border border-Pink'}`} style={{ marginTop: '0.12rem' }}>
                                            <div
                                              className={`${isActive2 && 'border border-Purple'} flex items-center gap-3`}
                                              role='button'
                                              tabIndex={0}
                                              onClick={() => handleMenuClick(data?.routes)}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                  handleMenuClick(data?.routes)
                                                }
                                              }}>
                                              <AntdComponents.Menu.Item
                                                onClick={() => { navigate(`${data?.routes}`) }}
                                                className={`side_menu_tab w-full h-10 p-2 md:p-6 ${isActive2 ? 'bg-Black border border-Blue' : 'bg-DarkGrey'}`}
                                              >
                                                <span className='ps-8'>
                                                  {data?.title}
                                                </span>
                                              </AntdComponents.Menu.Item>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })
                                }
                              </AntdComponents.Menu.SubMenu>
                              :
                              <AntdComponents.Menu.Item
                                onClick={() => { navigate(`${item?.routes}`) }}
                                className={`side_menu_tab w-full h-10 p-2 md:p-6 ${isActive ? 'bg-Black border border-Blue' : 'bg-DarkGrey'}`}
                              >
                                <div className={`flex items-center gap-3 mt-2`}
                                  role='button'
                                  tabIndex={0}
                                  onClick={() => handleMenuClick(item?.routes)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleMenuClick(item?.routes)
                                    }
                                  }}
                                >
                                  <span>
                                    {item.icon}
                                  </span>
                                  <span className='hidden md:block mb-2'>
                                    {item?.title}
                                  </span>
                                </div>
                              </AntdComponents.Menu.Item>
                          }
                        </div>
                      </div>
                      {
                        SidebarList.length - 1 != index &&
                        <CustomDivider />
                      }
                    </>
                  )
                })
              }
            </AntdComponents.Menu>
          </Sider>
          <Content style={{ maxHeight: 'calc(100vh - 6rem)' }} className='py-5 px-3 md:px-10 overflow-y-auto'>
            <Outlet />
          </Content>

        </AntdComponents.Layout>
      </AntdComponents.Layout>
    </div>
  )
}

export default MainLayout
