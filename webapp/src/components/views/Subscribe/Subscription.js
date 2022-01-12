import { Typography} from 'antd';
import React from 'react'
import './Subscription.css';
import { useSelector } from 'react-redux';
import Checkout from './Checkout';

function Subscription() {
    const { Title } = Typography;
    const user = useSelector(state => state.user)

    //console.log("User", user)

    return (

        <div className="mainDiv">
            <Title level={2} > Subscription Details </Title>
            <hr />
            {user.userData && !user.userData.subscribed?
                <div className="subscription">
                    <p>You are not subscribed</p>
                    {/* <p>Please <a href="/checkout">Subscribe</a> first...</p> */}
                    <Checkout user = "user.userData.subscribed"/>
                </div>
                :   
                <div className="subscription">You are subscribed!</div>
            }
        </div>
    )
}

export default Subscription


