import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text, Modal } from 'react-native';
const { constants, styles } = require('./styles.js')

export class PopupForm extends Component {
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                style={styles.modalContainer}
            >
                <View style={styles.modalInnerContainer}>

                </View>
            </Modal>
        );
    }
}
