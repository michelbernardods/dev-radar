import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const githubUsername = navigation.getParam('githube_username');

    return <WebView style={{flex: 1}} source={{uri: `http://github.com/${githubUsername}`}}/>
}

export default Profile;