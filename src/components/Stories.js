import React from 'react'

const Stories = () => {
    const [state, setState] = React.useState([
        {id:1,image: '/images/1.avif', name: "Yuji Itadori"},
        {id:2,image: '/images/2.avif', name: "Light Yagami"},
        {id:3,image: '/images/3.png', name: "kawai on'nanako"},
        {id:4,image: '/images/4.jpg', name: "lone wolf"},
        {id:5,image: '/images/5.jpg', name: "gojo sataraou"},
        {id:6,image: '/images/6.jpg', name: "lonely girl"},
        {id:7,image: '/images/7.webp', name: "nezuko chaaan"},
        {id:8,image: '/images/8.jpg', name: "monkey D luffy"},
        {id:9,image: '/images/9.jpeg', name: "criminal guy"},
        {id:10,image: '/images/10.webp', name: "sung jin woo"},
    ])

    return (
        <div className="stories">
            {state.map(user =>(
                <div className="stories__info" key={user.id}>
                <div className="stories__img">
                    <span>
                        <img src={user.image} alt="" />
                    </span>
                </div>
                <div className="stories__name">{user.name}</div>
                </div>
            ))}
        </div>
    )
    }

    export default Stories
