import React from 'react'
import Canvas from "../Canvas"

const Profile = () => {
    return (
        <Canvas id="profile" width="24" height="24">
            <g fill="none" fillRule="evenodd">
                <path fill="#D8D8D8" fillOpacity="0" d="M0 0h24v24H0z"/>
                <g stroke="#6236FF" strokeWidth="2" transform="translate(4 2)">
                    <circle cx="8" cy="5" r="4"/>
                    <path strokeLinecap="round" d="M0 18c1.422-4 4.089-6 8-6 3.911 0 6.578 2 8 6"/>
                </g>
            </g>
        </Canvas>
    )
}
export default Profile