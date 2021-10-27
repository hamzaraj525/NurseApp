import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
import Swipeout from 'react-native-swipeout';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class HostApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      close: false,
    };
  }
  componentDidMount() {
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // console.log(child.val());
          li.push({
            key: child.key,
            name: child.val().name,
            age: child.val().age,
            gender: child.val().gender,
            contact: child.val().contact,
            date: child.val().date,
          });
          if (child.val().age > 6) {
            this.notifyHost();
          } else {
            this.handleNotification();
          }
        });
        this.setState({list: li});
      });
  }
  notifyHost = (item, index) => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Host App',
      message: 'A New Patient is weak In the List ',
      color: 'blue',
    });
  };
  handleNotification = (item, index) => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Host App',
      message: 'A New Patient is Added In the List ',
      color: 'blue',
    });
  };
  note = (item, index) => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Host App',
      message: 'A Patient is Deleted In the List ',
      color: 'blue',
    });
  };
  deleteUser = Item => {
    database()
      .ref('users/' + Item.key)
      .remove()
      .then(() => {
        this.note();
      })
      .catch(err => {
        console.log(err);
      });
  };

  actionOnRow = item => {
    var Name = item.name;
    var Age = item.age;
    var Gender = item.gender;
    var contact = item.contact;
    var DDate = item.date;

    // alert(Name + '\n' + Gender + '\n' + contact + '\n' + Age);
    this.props.navigation.navigate('graphScreen', {
      Name,
      Age,
      DDate,
    });
  };
  renderUser = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.actionOnRow(item)}
        style={{
          borderRadius: 9,
          margin: 11,
          backgroundColor: 'pink',
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.age}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.name}{' '}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.gender}{' '}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.contact}{' '}
        </Text>
        <TouchableHighlight onPress={() => this.deleteUser(item)}>
          <Image
            style={[styles.loginBtn]}
            source={require('./images/clss.png')}
          />
        </TouchableHighlight>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
            }}>
            Active Patients List{' '}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={item => item.key}
          renderItem={this.renderUser}
          extraData={this.state.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 8,
  },
  container: {
    marginTop: 22,
    flex: 1,
  },
  loginBtn: {
    width: 25,
    height: 25,
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: '2%',
    borderRadius: 22,
    backgroundColor: '#fff',
  },
});
