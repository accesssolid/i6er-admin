import React from 'react'

const MultiColorDiv = ({ classFirstDiv, classSecondDiv,classThirdDiv, component }) => {
    return (
        <div className={`border border-Pink m-auto ${classFirstDiv}`}>
            <div className={`border border-Purple ${classSecondDiv}`}>
                <div className={`border border-Blue ${classThirdDiv}`}>
                    {component}
                </div>
            </div>
        </div>
    )
}

export default MultiColorDiv
