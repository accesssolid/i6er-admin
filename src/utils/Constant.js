import { Typography } from "antd";
import { ReactIcons } from "./ReactIcons";

export const fileUrl = process.env.REACT_APP_FILE_URL
export const acceptImageType ='image/jpg,image/jpeg,image/png,image/gif'

export const TableItemRenderer = (current, type, pagination) => {
    if (type === 'prev' && current != 0) {
      return <Typography className="text-White paragraph font-bold mt-2">PREV</Typography>
    }
    if (type === 'next' && current != pagination?.current) {
      return <Typography className="text-White paragraph font-bold mt-2">NEXT</Typography>
    }
    if (type === 'page') {
      return <p>{current}</p>;
    }
    return null;
  };

  // Helper function to generate sorter configurations
/**
 * 'alpha' for alphabetical sorting
*/
export const getSorterConfig = (dataIndex, sortType = 'alpha') => ({
  
  sorter: (a, b) => {
    const aValue = a[dataIndex];
    const bValue = b[dataIndex];    
      if (!aValue) return 1; // Move null/undefined to the end
      if (!bValue) return -1;
  
      if (sortType === 'date') {
        return new Date(aValue) - new Date(bValue);
      }
      if (sortType === 'phone' || sortType === 'number') {
        return aValue - bValue; // Numeric comparison
      }
  
      return aValue?.localeCompare(bValue); // Alphabetical or lexicographical sort
    },
    // showSorterTooltip: { title: `Sort by ${dataIndex}` },
    showSorterTooltip: false,
    sortDirections: ['ascend', 'descend', null],
    sortIcon: ({ sortOrder }) => {
      if (sortType === 'phone' || sortType === 'number') {
        // Use numeric icons for phone number column
        if (sortOrder === 'ascend') {
          return <ReactIcons.SortNumericAscIcon className="text-gray-600" />;
        } else if (sortOrder === 'descend') {
          return <ReactIcons.SortNumericDescIcon className="text-gray-600" />;
        } else {
          return <ReactIcons.SortByNumericIcon className="text-gray-600" />;
        }
      } else {
        // Default alphabetical icons
        if (sortOrder === 'ascend') {
          return <ReactIcons.SortAlphaAscIcon className="text-gray-600" />;
        } else if (sortOrder === 'descend') {
          return <ReactIcons.SortAlphaDescIcon className="text-gray-600" />;
        } else {
          return <ReactIcons.SortByAlphaIcon className="text-gray-600" />;
        }
      }
    }
  });
export const getSorterConfigForObject = (dataIndex, sortType = 'alpha',keyName) => ({
  
  sorter: (a, b) => {
    const aValue = a[dataIndex][keyName];
    const bValue = b[dataIndex][keyName];
      if (!aValue) return 1; // Move null/undefined to the end
      if (!bValue) return -1;
  
      if (sortType === 'date') {
        return new Date(aValue) - new Date(bValue);
      }
      if (sortType === 'phone' || sortType === 'number') {
        return aValue - bValue; // Numeric comparison
      }
  
      return aValue?.localeCompare(bValue); // Alphabetical or lexicographical sort
    },
    // showSorterTooltip: { title: `Sort by ${dataIndex}` },
    showSorterTooltip: false,
    sortDirections: ['ascend', 'descend', null],
    sortIcon: ({ sortOrder }) => {
      if (sortType === 'phone' || sortType === 'number') {
        // Use numeric icons for phone number column
        if (sortOrder === 'ascend') {
          return <ReactIcons.SortNumericAscIcon className="text-gray-600" />;
        } else if (sortOrder === 'descend') {
          return <ReactIcons.SortNumericDescIcon className="text-gray-600" />;
        } else {
          return <ReactIcons.SortByNumericIcon className="text-gray-600" />;
        }
      } else {
        // Default alphabetical icons
        if (sortOrder === 'ascend') {
          return <ReactIcons.SortAlphaAscIcon className="text-gray-600" />;
        } else if (sortOrder === 'descend') {
          return <ReactIcons.SortAlphaDescIcon className="text-gray-600" />;
        } else {
          return <ReactIcons.SortByAlphaIcon className="text-gray-600" />;
        }
      }
    }
  });

 export const userStatus ={
    ACTIVE:1,
    DELETE:2,
    DEACTIVATED:3,
  }