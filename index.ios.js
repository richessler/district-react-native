"use strict";

var React = require("react-native");
import ExNavigator from '@exponent/react-native-navigator';

var {
    AppRegistry,
    StyleSheet,
    Button,
} = React;

class districtin extends React.Component {
  render() {
    return (
      <ExNavigator
        initialRoute={Router.getHomeRoute()}
        style={{ flex: 1 }}
        sceneStyle={{ paddingTop: 64 }}
      />
    );
  }
}

let Router = {
  getHomeRoute() {
    return {
      // Return a React component class for the scene. It receives a prop
      // called `navigator` that you can use to push on more routes.
      getSceneClass() {
        return require('./app/Views/Main');
      },

      // When this scene receives focus, you can run some code. We're just
      // proxying the `didfocus` event that Navigator emits, so refer to
      // Navigator's source code for the semantics.
      onDidFocus(event) {
        console.log('Home Scene received focus.');
      },

      // Return a string to display in the title section of the navigation bar.
      // This route's title is displayed next to the back button when you push
      // a new route on top of this one.
      getTitle() {
        return 'theDistrict.in';
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight;
      },
    };
  },
}

AppRegistry.registerComponent('districtin', () => districtin);
