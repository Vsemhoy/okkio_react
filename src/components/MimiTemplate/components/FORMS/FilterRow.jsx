import React from "react";

const ClaimFilters = ({label, children}) => {

    return (
        <div className={'mi-filter-row'}>
            {label && (
                <div className={'mi-filter-label'}>
                    {label}
                </div>
            )}
            <div className={'mi-filter-input'}>
                {children}
            </div>
        </div>
    )
}

export default ClaimFilters;