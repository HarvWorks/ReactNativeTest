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
                            <Text style={styles.popupTitle}>{this.props.title}</Text>
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
                            style={[{height: 150, fontSize: 14},styles.textInput]}
                            value={this.props.item.desc}
                            onChangeText={(text) => {this.props.update({currentDesc: text});}}
                            placeholder={"A short description"}
                            />

                        <View style={styles.datePickerContainer}>
                            <DatePicker
                                style={{width: 150}}
                                date={this.props.item.date}
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                                maxDate={new Date() + 100000000}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={constants.datePickerStyles}
                                onDateChange={(date) => {this.props.update({currentDate: date})}}
                                />
                        </View>

                        <View style={styles.popupButtons}>

                            <TouchableHighlight
                                onPress={() => {this.props.confirm(this.props.item)}}
                                style={styles.popupButton}
                                underlayColor={constants.openActionColor}
                                >
                                <Text style={styles.popupButtonText}>Confirm</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={this.props.cancel}
                                style={[{borderLeftWidth: 0.5, borderLeftColor: '#dbdbdf'},styles.popupButton]}
                                underlayColor={constants.openActionColor}
                                >
                                <Text style={styles.popupButtonText}>Cancel</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
