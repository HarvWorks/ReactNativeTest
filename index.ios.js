import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Modal,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} from 'react-native';

const { constants, styles } = require('./js/styles.js')
const { StatusBar } = require('./js/StatusBar.js');
const { ActionButton } = require('./js/ActionButton.js');
const { ListItem } = require('./js/ListItem.js');
const { ExpandedListItem } = require('./js/ExpandedListItem.js');
const { PopupForm } = require('./js/Modal.js');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDIjjJ96-IhHCB1jiskTsMc3CQU0VJRCb8",
    authDomain: "reactnativetest-a2178.firebaseapp.com",
    databaseURL: "https://reactnativetest-a2178.firebaseio.com",
    projectId: "reactnativetest-a2178",
    storageBucket: "reactnativetest-a2178.appspot.com",
    messagingSenderId: "813177984518"
};
const fireBaseApp = firebase.initializeApp(config);

class ReactNativeTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.fireRef = this.getRef().child('items');
        this.itemLength = 0
        this.title = "To Do List"
    }

    state = {
        expandedIndex: -1,
        currentItem: {},
        visible: false,
    }

    getRef() {
        return fireBaseApp.database().ref()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    title={this.title}
                    onPress={this._changeTitle.bind(this)}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}
                />
                <ActionButton
                    title="Add"
                    onPress={this._addItem.bind(this)}
                />
                <PopupForm
                    data={this.state.currentItem}
                    visible={this.state.visible}
                />
            </View>
        );
    }

    _renderItem(item) {
        const delPress = () => {
            AlertIOS.alert(
                'Delete?',
                null,
                [
                    {
                        text: 'Complete',
                        onPress: (text) => this.fireRef.child(item._key).remove()
                    },
                    {
                        text: 'Cancel'
                    }
                ]
            );
        };
        const expandPress = () => {
            item.expanded = true
        }
        console.log(this.state.dataSource);
        console.log(this.state.expandedIndex);
        if ( item._key != this.state.expandedIndex ) {
            return (
                <ListItem item={item}
                    delPress={delPress}
                    editPress={() => {this.state.visible = true}}
                    expandPress = {() => {this.state.expandedIndex = item._key; this.forceUpdate()}}
                />
            );
        }
        else {
            return (
                <ExpandedListItem
                    item={item}
                    delPress={delPress}
                    editPress={() => {this.state.visible = true}}
                    shrinkPress = {() => {this.state.expandedIndex = -1; this.forceUpdate()}}
                />
            );
        }
    }

    _addItem() {
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                {
                    text: 'Add',
                    onPress: (text) => { if (text != "") {this.fireRef.push({ title: text, order: this.itemLength })} }
                },
            ],
            'plain-text',
        );
    }

    _changeTitle() {
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                {
                    text: 'Change',
                    onPress: (text) => { this.title = text; this.forceUpdate() }
                },
                {
                    text: 'Cancel'
                }
            ],
            'plain-text',
            this.title
        );
    }

    listenForItems(itemRef) {
        itemRef.on('value', (snap) => {

            this.itemLength = 0
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key,
                    order: child.val().order,
                });
                this.itemLength ++
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    componentDidMount() {
        this.listenForItems(this.fireRef);
    }
}

AppRegistry.registerComponent('ReactNativeTest', () => ReactNativeTest);
