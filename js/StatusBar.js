import React, {Component} from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('./styles.js')

export class StatusBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.statusbar}/>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}
