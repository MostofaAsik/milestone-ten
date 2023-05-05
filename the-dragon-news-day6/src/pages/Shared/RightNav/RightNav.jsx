import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import QZon from '../QZon/QZon';
import bg from '../../../assets/bg.png'


const RightNav = () => {
    return (
        <div>
            <h4 className='mt-4 mb-3'>Login With</h4>
            <Button className='mb-2' variant="outline-primary"> <FaGoogle />Login With Google</Button>
            <Button variant="outline-secondary"><FaGithub />Login With Github</Button>
            <div className='mt-3'>
                <h4 className='mt-4'>Find Us On</h4>
                <ListGroup>
                    <ListGroup.Item> <FaFacebook></FaFacebook> Facebook</ListGroup.Item>
                    <ListGroup.Item> <FaTwitter></FaTwitter>Twitter</ListGroup.Item>
                    <ListGroup.Item><FaInstagram></FaInstagram>Instagram</ListGroup.Item>

                </ListGroup>
            </div>
            <QZon></QZon>
            <div>
                <img src={bg} alt="" />
            </div>
        </div>
    );
};

export default RightNav;