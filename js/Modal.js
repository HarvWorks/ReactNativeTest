import React, { Component } from 'react';
import ReactNative, { View, TouchableHighlight, Text, Modal, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
const { constants, styles } = require('./styles.js')

export class PopupForm extends Component {
    handleChange() {
        this.props.onUserInput(
            this.refs.searchStringInput.value
        );
    }
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalInnerContainer}>
                        <View style={styles.centerStuff}>
                            <Text style={styles.popupTitle}>Why Not?</Text>
                        </View>
                            <Text style={styles.popupDesc}>Title</Text>
                        <TextInput
                            style={[{height: 35, fontSize: 16},styles.textInput]}
                            value={this.props.item.title}
                            onChangeText={(text) => {this.props.update({currentTitle: text});}}
                            placeholder={"Title"}
                            />
                        <Text style={styles.popupDesc}>Description</Text>
                        <TextInput
                            multiline = {true}
                            numberOfLines = {4}
                            style={[{height: 150, fontSize: 14},styles.textInput]}
                            value={this.props.item.desc}
                            onChangeText={(text) => {this.props.update({currentDesc: text});}}
                            placeholder={"A short description"}
                            />
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.item.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            maxDate={new Date() + 100000000}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.props.update({currentDate: date})}}
                            />
                        <View style={styles.centerStuff}>
                            <TouchableHighlight
                                onPress={this.props.cancel}
                                style={styles.closeButton}
                                underlayColor={constants.openActionColor}
                                >
                                <Text style={styles.liText}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {this.props.confirm(this.props.item)}}
                                style={styles.closeButton}
                                underlayColor={constants.openActionColor}
                                >
                                <Text style={styles.liText}>confirm</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
