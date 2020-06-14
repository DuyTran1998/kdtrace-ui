import React, {Component} from 'react';
import ProducerMenu from '../components/ProducerMenu';
import Navigation from '../components/Navigation';
import ProducerBody from '../components/ProducerBody';

class KDTracePage extends Component{
    render(){
        return(
            <div className="horizontal-layout horizontal-menu horizontal-menu-padding 2-columns   menu-expanded" data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
            <Navigation />
            <ProducerMenu />
            <ProducerBody />
            </div>
        )
    }
}export default KDTracePage;