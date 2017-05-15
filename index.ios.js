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

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-');
};

class ReactNativeTest extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            fireRef: this.getRef().child('items'),
            title: "To Do List",
            expandedIndex: -1,
            modalVisible: false,
            currentTitle: "",
            currentDesc: "",
            currentDate: date.yyyymmdd(),
            currentPriority: 0,
            currentKey:'',
            isUpdate: 'New Item',
        };
    }

    getRef() {
        return fireBaseApp.database().ref()
    }

    render() {
        return (
            <View style={styles.container}>
                <PopupForm
                    item={{title:this.state.currentTitle, desc:this.state.currentDesc, date:this.state.currentDate, priority:this.state.currentPriority, key:this.state.currentKey}}
                    visible={this.state.modalVisible}
                    cancel={() => {this.state.modalVisible = false; this.forceUpdate()}}
                    confirm = {this._addItem.bind(this)}
                    update = {this.updateState.bind(this)}
                    title = {this.state.isUpdate}
                />
                <StatusBar
                    title={this.state.title}
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
                    onPress={this.addItemPrompt.bind(this)}
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
                        onPress: (text) => this.state.fireRef.child(item._key).remove()
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
        if ( item._key != this.state.expandedIndex ) {
            return (
                <View style={styles.li}>
                    <ListItem
                        item={item}
                        delPress={delPress}
                        editPress={() => {this.editItemPrompt(item)}}
                        expandPress = {() => {this.state.expandedIndex = item._key; this.forceUpdate()}}
                    />
                </View>
            );
        }
        else {
            return (
                <ExpandedListItem
                    item={item}
                    delPress={delPress}
                    editPress={() => {this.editItemPrompt(item)}}
                    shrinkPress = {() => {this.state.expandedIndex = -1; this.forceUpdate()}}
                />
            );
        }
    }

    addItemPrompt() {
        const date = new Date()
        this.state.modalVisible = true;
        this.state.currentTitle = '';
        this.state.currentDesc = '';
        this.state.currentDate = date.yyyymmdd();
        this.state.currentPriority = 0;
        this.state.currentKey = ''
        this.state.isUpdate = 'New Item';
        this.forceUpdate()
    }

    editItemPrompt(item) {
        this.state.modalVisible = true;
        this.state.currentTitle = item.title;
        this.state.currentDesc = item.desc;
        this.state.currentDate = item.date;
        this.state.currentPriority = item.priority;
        this.state.currentKey = item._key;
        this.state.isUpdate = 'Edit Item';
        this.forceUpdate()
    }

    _addItem(item) {
        if (item.title != "") {
            const temp = {
                title: item.title,
                desc: item.desc,
                date: item.date,
                priority: item.priority,
            }
            if(this.state.isUpdate == 'New Item') {
                this.state.fireRef.push(temp);
            }
            else {
                const insert = {};
                insert[item.key] = temp
                this.state.fireRef.update(insert);
            }
            this.state.modalVisible = false;
            this.forceUpdate()
        }
    }

    _changeTitle() {
        AlertIOS.prompt(
            'Change Title',
            null,
            [
                {
                    text: 'Change',
                    onPress: (text) => { this.state.title = text; this.forceUpdate() }
                },
                {
                    text: 'Cancel'
                }
            ],
            'plain-text',
            this.state.title
        );
    }

    updateState(currentState) {
        this.setState (currentState);
    }

    listenForItems(itemRef) {
        itemRef.on('value', (snap) => {

            const items = [];
            snap.forEach((child) => {
                items.push({
                    _key: child.key,
                    title: child.val().title,
                    desc: child.val().desc,
                    date: child.val().date,
                    priority: child.val().priority,
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    componentDidMount() {
        this.listenForItems(this.state.fireRef);
    }
}

AppRegistry.registerComponent('ReactNativeTest', () => ReactNativeTest);
