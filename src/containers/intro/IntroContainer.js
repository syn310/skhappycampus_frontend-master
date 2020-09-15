import React, { Component } from 'react';
import {IntroImg} from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as menuActions from 'modules/menu';

class IntroContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submenu:""
        }
    }

    componentWillMount = () => {

        this.props.MenuActions.setClickMenu("/intro");
        
        this.setState({
            submenu: window.location.href.split("intro/")[1]
        })
    }

    render() {
        const { submenu } = this.state;
        return (
            <IntroImg submenu={submenu}></IntroImg>
         );
    }
}

export default connect(
    (state) => ({

    }), (dispatch) => ({
        MenuActions: bindActionCreators(menuActions, dispatch),
    })
)(IntroContainer);
