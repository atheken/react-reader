/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Model from './model.js'
import Home from './home.js'

class ReactReader extends Component {
  render() {
    return (
      <NavigatorIOS
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        initialRoute={{
          component: Home,
          navigationBarHidden: false,
          title: "Get feed items"
        }} 
      />
    );
  }
}

const styles = StyleSheet.create({
  navWrap: {
    flex: 1
  },
  nav: {
    flex: 1
  }
})

AppRegistry.registerComponent('ReactReader',
 () => ReactReader);


