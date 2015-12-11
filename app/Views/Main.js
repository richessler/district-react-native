"use strict";

var React = require("react-native");
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var jsDate = new Date();
var dateNum = jsDate.getFullYear() + '-' + (jsDate.getMonth() + 1) + '-' + jsDate.getDate();
var endDateNum = jsDate.getFullYear() + '-' + (jsDate.getMonth() + 1) + '-' + (jsDate.getDate() + 1);
var todayDate = dateNum.toString();
var endDate = endDateNum.toString();

var REQUEST_URL = 'http://api.seatgeek.com/2/events?datetime_utc.gte=' + todayDate + '&datetime_utc.lte=' + '2015-12-31' + '&venue.state=DC&per_page=40';


var {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ListView,
    View,
    NavigatorIOS,
} = React;

var Main = React.createClass({

  getInitialState: function() {
    return {
      navigationBarHidden: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.events),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEvent}
        showsVerticalScrollIndicator={false}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'http://i.imgur.com/5CsSMid.gif'}}
          style={styles.loader}
        />
        <Text style={styles.statusText}>
          Loading events...
        </Text>
      </View>
    );
  },

  renderEvent: function(event) {
    // var eventDateFull = {event.datetime_local}
    // var eventDate = function(){
    //   var dateArray = eventDateFull.split('T');
    //   return dateArray[0];
    // }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.leftContainer}>
            <Image
              source={{uri: event.performers[0].images.huge ? event.performers[0].images.huge : 'http://i.imgur.com/GJxu7z1.png'}}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{event.title.split('-')[0]}</Text>
            <Text style={styles.year}>{event.venue.name} - {event.type.capitalize().split('_').join(' ')} - {event.datetime_local.split('T')[0]}</Text>
          </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    statusText: {
      textAlign: 'center',
    },
    loader: {
      flex: 1,
      height: 400,
      width: 390,
    },
    container: {
      backgroundColor: '#fff',
      marginTop: 0,
      paddingTop: 5,
    },
    content: {
      backgroundColor: 'rgba(0,0,0,0.03)',
      marginHorizontal: 4,
      padding: 5,
      paddingBottom: 0,
    },
    title: {
      color: '#000',
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
    },
    year: {
      fontFamily: 'Roboto-Italic',
      fontSize: 12,
      marginBottom: 5,
      textAlign: 'left',
    },
    leftContainer: {
      backgroundColor: '#eee',
      height: 75,
      marginBottom: 5,
      width: 105,
      position: 'relative',
      // marginRight: 5,
      overflow: 'hidden',
      // paddingVertical: 20,
      // paddingBottom: 40,
      // top: 0,
    },
    thumbnail: {
      height: 140,
      left: -50,
      position: 'absolute',
      top: -10,
      // margin: 9,
      // marginBottom: 7,
      // marginTop: 7,
      width: 185,
    },
    rightContainer: {
      bottom: 0,
      height: 0,
      position: 'relative',
      left: 110,
      top: -83,
      width: 230,
      // width: 200,
      // flex: 1,
    }
});

module.exports = Main;
