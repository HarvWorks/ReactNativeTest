import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} from 'react-native';

const { constants, styles } = require('./js/styles.js')
const { StatusBar } = require('./js/StatusBar.js');
const { ActionButton } = require('./js/ActionButton.js');
const { ListItem } = require('./js/ListItem.js');

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
    }

    getRef() {
        return fireBaseApp.database().ref()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar title="To Do List"/>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true} style={styles.listview}/>
                <ActionButton title="Add" onPress={this._addItem.bind(this)}/>
            </View>
        );
    }

    _renderItem(item) {
        const onPress = () => {
            AlertIOS.alert(
                'Complete',
                null,
                [
                    {text: 'Complete', onPress: (text) => this.fireRef.child(item._key).remove()},
                    {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
                ]
            );
        };
        return (
            <ListItem item={item} onPress={onPress} />
        );
    }

    _addItem() {
        console.log('Add Item')
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                {
                    text: 'Add',
                    onPress: (text) => {this.fireRef.push({ title: text, order: this.itemLength })}
                },
            ],
            'plain-text'
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
                    _key: child.key
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
