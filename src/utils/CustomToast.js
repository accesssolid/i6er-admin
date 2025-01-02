import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const CustomToast = ( type, message, position="top-center", time ) => {
    // Dismiss any existing toasts to avoid stacking
    toast.dismiss();

    // Toast options
    const options = {
        position,
        autoClose: type === 'e' || type === 'w' ? 3000 : time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        type: {
            e: 'error',
            s: 'success',
            w: 'warning',
            default: 'default',
        }[type] || 'default', // Defaults to 'default' type if an unknown type is passed
    };

    // Show toast with the provided message and options
    toast(message, options);
};

// Prop types for validation and developer guidance
CustomToast.propTypes = {
    type: PropTypes.oneOf(['e', 's', 'w', 'default']),
    message: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
        "top-left",
        "top-right",
        "top-center",
        "bottom-left",
        "bottom-right",
        "bottom-center"
    ]),
    time: PropTypes.number,
};

// Default props for optional values
CustomToast.defaultProps = {
    type: 'default',
    position: "top-center",
    time: 5000,
};

export default CustomToast;

/* 
    ******** Available Options ********  

    ** Positions **  
    - "top-left"
    - "top-right"
    - "top-center"
    - "bottom-left"
    - "bottom-right"
    - "bottom-center"

    ** Types ** 
    - success = 's'
    - error = 'e'
    - warning = 'w'
    - default
*/
