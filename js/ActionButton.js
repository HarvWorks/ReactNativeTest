import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('./styles.js')

export class ActionButton extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight onPress={this.props.onPress} underlayColor={constants.actionColor}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
