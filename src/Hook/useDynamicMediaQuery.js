// src/hooks/useDynamicMediaQuery.js
import { useMediaQuery } from 'react-responsive';

const useDynamicMediaQuery = (screenSize, isMinWidth = true) => {
    const query = isMinWidth
        ? `(min-width: ${screenSize}px)`
        : `(max-width: ${screenSize}px)`;

    return useMediaQuery({ query });
};

export default useDynamicMediaQuery;
