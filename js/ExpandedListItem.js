import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';
const { constants, styles } = require('./styles.js')
const { ListItem } = require('./ListItem.js');

export class ExpandedListItem extends Component {
    render() {
        return (
            <View style={styles.li}>
                <ListItem
                    item={this.props.item}
                    delPress={this.props.delPress}
                    editPress={this.props.editPress}
                    expandPress = {this.props.shrinkPress}
                />
                <View>
                    <TouchableHighlight
                        onPress={this.props.shrinkPress}
                        underlayColor={constants.openActionColor}
                        >
                        <View style={styles.expandedTextBox}>
                            <Text style={styles.expandedText}>{this.props.item.date}</Text>
                            <Text style={styles.expandedText}>{this.props.item.desc}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
