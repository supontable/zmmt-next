import React from 'react'

const Canvas = ({children, id, width, height, className=''}) => {
    let viewBox = [0, 0, width, height]
    return (
        <svg
            className={className}
            preserveAspectRatio='xMinYMin'
            id={id}
            width={width}
            height={height}
            viewBox={viewBox}
        >
            {children}
            <style jsx>{`
                svg {
                    margin-bottom: -4px;
                }
            `}</style>
        </svg>
    )
}

export default Canvas