import React from 'react-web';
import View from './components/View';
import Image from './components/Image';
import AppRegistry from './lib/AppRegistry';

export default {
    ...React,
    View,
    ScrollView: View,
    Image,
    AppRegistry
}
