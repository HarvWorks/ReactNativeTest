const {StyleSheet} = require('react-native');

export const constants = {
  addActionColor: '#4db8ff',
  openActionColor: '#ffffff',
  delActionColor: '#4db8ff',
  editActionColor: '#4db8ff',
  editTitleColor: '#4db8ff',
};

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    listview: {
        flex: 1,
    },
    li: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#eeeeee',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    liTitle: {
        flexDirection: 'row',
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#333333',
        fontSize: 16,
    },
    liTextBox: {
        flex: 0.88,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liEdit: {
        flex: 0.13,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 16,
    },
    liDel: {
        flex: 0.11,
        paddingLeft: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#eeeeee',
        marginTop: 7,
        marginBottom: 7,
    },
    editText: {
        color: '#0099ff',
        fontSize: 14,
    },
    delText: {
        color: '#ff0000',
        fontSize: 14,
    },
    navbar: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#eeeeee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: 5,
    },
    navbarTitle: {
        color: '#444444',
        fontSize: 16,
        fontWeight: "500"
    },
    statusbar: {
        backgroundColor: '#ffffff',
        height: 22,
    },
    center: {
        textAlign: 'center',
    },
    actionText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    action: {
        backgroundColor: constants.addActionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modalInnerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
});
