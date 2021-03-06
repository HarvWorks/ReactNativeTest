import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('./styles.js')

export class ListItem extends Component {
    render() {
        return (
            <View style={styles.liTitle}>

                <TouchableHighlight
                    onPress={this.props.expandPress}
                    style={styles.liTextBox}
                    underlayColor={constants.openActionColor}
                    >
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.editPress}
                    style={styles.liEdit}
                    underlayColor={constants.editActionColor}
                    >
                    <Text style={styles.editText}>Edit</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.delPress}
                    style={styles.liDel}
                    underlayColor={constants.delActionColor}
                    >
                    <Text style={styles.delText}>Del</Text>
                </TouchableHighlight>

            </View>
        );
    }
}
