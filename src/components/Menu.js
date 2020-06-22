import React from 'react';
import AdminMenu from './AdminMenu';
import ProducerMenu from './ProducerMenu';

function Menu(props){
    const roleName = props.roleName;
    switch (roleName) {
        case 'ROLE_ADMIN':
            return <AdminMenu />;
        case 'ROLE_PRODUCER':
            return <ProducerMenu />;
        default:
            return null;
    }
}export default Menu;