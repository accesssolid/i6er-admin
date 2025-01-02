import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';  // You can also implement debounce manually if lodash is not an option.
import { ReactIcons } from '../utils/ReactIcons';


const DebouncedSearch = ({ onSearch, delay, placeholder, style, className }) => {  // Set default value directly in the parameter
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce function to handle search
    const debouncedSearch = useCallback(
        debounce((value) => {
            onSearch(value);  // Send the search value to the parent component
        }, delay), [onSearch, delay]
    );

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();  // Cleanup the debounce on unmount
        };
    }, [debouncedSearch]);

    return (
        <Input
            style={style}
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            allowClear
            className={`h-10 bg-Black rounded-none border-none w-full md:w-60`}
            prefix={<ReactIcons.SearchIcon className={'text-White'} />}
        />
    );
};

// Prop types for validation
DebouncedSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,  // Callback to send search value to parent
    delay: PropTypes.number,  // Optional: debounce delay
    style: PropTypes.object,  // Optional: debounce delay
    className: PropTypes.string,  // Optional: debounce delay
};

// Default props
DebouncedSearch.defaultProps = {
    delay: 300,             // Default delay if not passed
    placeholder: 'Search..', // Default placeholder if not passed
    width: '100%',         // Default width if not passed
    style: {},              // Empty object for additional custom styling
    className: '',              // Empty object for additional custom styling
};

export default DebouncedSearch;