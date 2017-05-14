import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('./styles.js')

export class ListItem extends Component {
    render() {
        return (
            <View style={styles.li}>
                <TouchableHighlight onPress="" style={styles.liTextBox}>
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                </TouchableHighlight>
                <View style={styles.liEdit}>
                    <Text style={styles.editText}>Edit</Text>
                </View>
                <TouchableHighlight onPress={this.props.onPress} style={styles.liDel}>
                    <Text style={styles.delText}>Del</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
