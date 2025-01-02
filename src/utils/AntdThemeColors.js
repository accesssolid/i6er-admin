// Helper function to get CSS variables from :root
const getCSSVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

export const AntdThemeColors = {
    components: {
        Layout: {
            headerBg: getCSSVariable('--darkGrey'),
            bodyBg: getCSSVariable('--black'),
            colorText: getCSSVariable('--defaultWhiteColor'),
        },
        Menu: {
            darkItemBg: getCSSVariable('--darkGrey'),
            darkItemColor: getCSSVariable('--defaultWhiteColor'),
        },
        Select: {
            selectorBg: getCSSVariable('--black'),
            optionSelectedColor: getCSSVariable('--black'),
            colorText: getCSSVariable('--defaultWhiteColor'),
            optionSelectedBg: getCSSVariable('--greySecondary'),
            activeBorderColor: getCSSVariable('--defaultWhiteColor'),
            hoverBorderColor: getCSSVariable('--defaultWhiteColor'),
            colorBgElevated: getCSSVariable('--darkGrey'),
            multipleItemBorderColor: getCSSVariable('--blue'),
        },
        Table: {
            headerBg: getCSSVariable('--defaultWhiteColor'),
            colorBgContainer: getCSSVariable('--darkGrey'),
            rowSelectedBg: getCSSVariable('--darkGrey'),
            borderColor: getCSSVariable('--darkGrey'),
            colorText: getCSSVariable('--defaultWhiteColor'),
            headerSortActiveBg: getCSSVariable('--greyTertiary'),
            headerSortHoverBg: getCSSVariable('--greyTertiary'),
        },
        Switch: {
            colorPrimary: getCSSVariable('--lightGreen'),
            colorPrimaryHover: getCSSVariable('--lightGreen'),
            colorTextQuaternary: getCSSVariable('--greyTertiary'),
            colorTextTertiary: getCSSVariable('--greyTertiary'),
        },
        Input:{
            colorTextDisabled:getCSSVariable('--defaultWhiteColor'),
            colorBgContainerDisabled:getCSSVariable('--black'),
        },
        Modal:{
            contentBg:getCSSVariable('--darkGrey'),
            headerBg:getCSSVariable('--darkGrey'),
            titleColor:getCSSVariable('--defaultWhiteColor'),

        },
        DatePicker:{
            hoverBg:getCSSVariable('--black'),
            activeBg:getCSSVariable('--black'),
            // colorText:getCSSVariable('--defaultWhiteColor')
        }
    },
};