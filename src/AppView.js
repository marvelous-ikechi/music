import React, {useEffect} from 'react';

import Navigator from './navigation';
import {Platform, UIManager} from 'react-native';

export default function AppView() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return <Navigator onNavigationStateChange={() => {}} />;
}
