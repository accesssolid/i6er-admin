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
        <AntdComponents.Typography className="text-para text-White px-3 py-2" onClick={() => navigate(RouterKeys.NON_Auth.CHANGE_PASSWORD)}>Change password</AntdComponents.Typography>
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
            <AntdComponents.Image preview={false} src={STATIC_IMAGES.LOGO} alt="logo" height={75} width={'auto'} role='button' onClick={() => navigate(RouterKeys.NON_Auth.HOME)} />
            <div className="">
              <AntdComponents.Popover content={popOverContent} arrow={false}>
                <div className="flex items-center justify-between px-5 border-2 border-Red rounded-5 h-12 " style={{ cursor: 'pointer' }}>
                  <AntdComponents.Typography className="text-White font-Poppins font-bold">Admin</AntdComponents.Typography>
                  <ReactIcons.ArrowDownIcon size={25} color="" style={{ marginLeft: 8 }} />
                </div>
              </AntdComponents.Popover>
            </div>
          </div>
        </Header>
        <AntdComponents.Layout className=''>
          <Sider width="15%" style={{ maxHeight: 'calc(100vh - 6rem)', minHeight: 'calc(100vh - 6.5rem)' }}
            className='shadow-sideShadow bg-DarkGrey overflow-y-auto mt-1 lg:min-w-[26%] xl:min-w-[10%]'
          >
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
                        className={`${isActive && ''}`}>
                        <AntdComponents.Menu.Item
                          onClick={() => { navigate(`${item?.routes}`) }}
                          className={`side_menu_tab w-full h-10 p-2 md:p-6 ${isActive ? 'bg-Blue' : 'bg-DarkGrey'}`}
                        >
                          <div className={`flex items-center gap-3`}
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
                            <span className='hidden lg:block'>
                              {item?.title}
                            </span>
                          </div>
                        </AntdComponents.Menu.Item>
                      </div>
                      {/* {
                        SidebarList.length - 1 != index &&
                      } */}
                      <CustomDivider />
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
