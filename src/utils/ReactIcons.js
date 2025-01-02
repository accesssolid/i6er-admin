import { BsThreeDots } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { ImSortAlphaAsc, ImSortAlphaDesc, ImSortNumbericDesc, ImSortNumericAsc } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronBackCircle, IoCloseCircle, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { MdSortByAlpha } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbSort09 } from "react-icons/tb";

export const ReactIcons = {
    BackIcon: ({ style, className, onClick }) => <IoChevronBackCircle style={{ ...style, fontSize: 30, cursor: 'pointer' }} className={`${className} text-DarkPurple`} onClick={onClick} />,
    SettingIcon: ({ style, className, onClick }) => <CiSettings style={style} className={className} onClick={onClick} />,
    NotificationIcon: ({ style, className, onClick }) => <IoNotificationsOutline style={style} className={className} onClick={onClick} />,
    SearchIcon: ({ style, className, onClick }) => <IoSearchOutline style={{ ...style, fontSize: 20, }} className={className} onClick={onClick} />,
    CloseIcon: ({ style, className, onClick }) => <IoCloseCircle style={{ ...style, fontSize: 30, cursor: 'pointer' }} className={`text-DarkPurple ${className}`} onClick={onClick} />,
    ThreeDotIcon: ({ style, className, onClick }) => <BsThreeDots style={{ ...style, fontSize: 30, cursor: 'pointer' }} className={`text-Black ${className}`} onClick={onClick} />,
    LogOutIcon: ({ style, className, onClick }) => <RiLogoutCircleLine style={{ ...style, fontSize: 30, cursor: 'pointer' }} className={`text-Black ${className}`} onClick={onClick} />,
    ArrowDownIcon: ({ style, className, onClick }) => <IoIosArrowDown style={{ ...style, fontSize: 22, cursor: 'pointer' }} className={`text-White ${className}`} onClick={onClick} />,
    PlusIcon: ({ style, className, onClick }) => <FiPlus style={{ ...style, fontSize: 30, cursor: 'pointer' }} className={`text-White ${className}`} onClick={onClick} />,

    // Sorting    
    SortByAlphaIcon: ({ style, className }) => <MdSortByAlpha style={{ ...style, fontSize: 20 }} className={className} />,
    SortAlphaAscIcon: ({ style, className }) => <ImSortAlphaAsc style={{ ...style, fontSize: 20 }} className={className} />,
    SortAlphaDescIcon: ({ style, className }) => <ImSortAlphaDesc style={{ ...style, fontSize: 20 }} className={className} />,

    SortByNumericIcon: ({ style, className }) => <TbSort09 style={{ ...style, fontSize: 20 }} className={className} />,
    SortNumericAscIcon: ({ style, className }) => <ImSortNumericAsc style={{ ...style, fontSize: 20 }} className={className} />,
    SortNumericDescIcon: ({ style, className }) => <ImSortNumbericDesc style={{ ...style, fontSize: 20 }} className={className} />,
}