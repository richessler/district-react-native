"use strict";

var React = require("react-native");
import ExNavigator from '@exponent/react-native-navigator';

var {
    AppRegistry,
    Text,
    StyleSheet,
    TouchableOpacity,
} = React;

class districtin extends React.Component {
  render() {
    return (
      <ExNavigator
        barTint='#FFFFFF'
        tintColor="#FFFFFF"
        initialRoute={Router.getHomeRoute()}
        sceneStyle={{ paddingTop: 64 }}
      />
    );
  }
}

let Router = {
  getHomeRoute() {
    return {
      getSceneClass() {
        return require('./app/Views/Main');
      },

      onDidFocus(event) {
        console.log('Home Scene received focus.');
      },
      getTitle() {
        return 'theDistrict.in';
      },
      renderLeftButton(navigator) {
        return (
          <TouchableOpacity
            touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
            onPress={() => navigator.push(Router.getOtherRoute())}>
            <Text style={ExNavigator.Styles.barLeftButtonText}>&#xf0c9;</Text>
          </TouchableOpacity>
        );
      },

      renderRightButton(navigator) {
        return (
          <TouchableOpacity
            touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
            onPress={() => navigator.push(Router.getOtherRoute())}>
            <Text style={ExNavigator.Styles.barRightButtonText}>&#xf0b0;</Text>
          </TouchableOpacity>
        );
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FromTheBottom;
      },
    };
  },
  getOtherRoute() {
    return {

      getSceneClass() {
        return require('./app/Views/Detail');
      },

      onDidFocus(event) {
        console.log('Home Scene received focus.');
      },

      getTitle() {
        return 'theDistrict.in';
      },
      renderLeftButton(navigator) {
        return (
          <TouchableOpacity
            touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
            onPress={() => navigator.push(Router.getHomeRoute())}>
            <Text style={ExNavigator.Styles.barLeftButtonText}>&#xf048;</Text>
          </TouchableOpacity>
        );
      },
      renderRightButton(navigator) {
        return (
          <TouchableOpacity
            touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
            onPress={() => navigator.push(Router.getOtherRoute())}>
            <Text style={ExNavigator.Styles.barRightButtonText}>&#xf0b0;</Text>
          </TouchableOpacity>
        );
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FromTheBottom;
      },
    };
  },
}

var styles = StyleSheet.create({
  // over: {
  //   right: 900,
  //   height: 90,
  //   width: 10,
  //   backgroundColor: 'rgba(0,0,0,0)',
  // }
})

AppRegistry.registerComponent('districtin', () => districtin);
