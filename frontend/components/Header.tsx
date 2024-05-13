import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

const HeaderComponent: React.FC<{ uri: string }> = ({ uri }) => {
    /**
     * NOTE:
     * Using a relative path with SvgUri to load local SVG files will not work because SvgUri expects a URI that points to a network resource. This is a common misunderstanding, especially when transitioning from web development to mobile development with React Native.
     * For local SVG files in a React Native project, you should use a different approach. Here are the options you can consider:
     * 
     * Option 1: Using react-native-svg Components Directly:
     * If you are dealing with static SVG files, the best practice is to convert them into React components using tools like react-native-svg-transformer. This allows you to import SVG files directly into your React Native components as if they were React components.
     * 
     * Option 2: Remote URL:
     * If you still want to use SvgUri for some reason, such as when the SVG files are dynamic and hosted on a server, you should use a full HTTP or HTTPS URL.
     */

    // Determine if the URI is for an SVG file. It is not possible to statically load SVGs unless they are loaded as a component like 
    const isSvg = uri.toLowerCase().endsWith('.svg');

    return (
        <View style={styles.header}>
            {isSvg ? (
                <SvgUri
                    width="100%"
                    height="200"
                    uri={uri}
                    onError={(e) => console.error('Failed to load SVG:', e)}
                />
            ) : (
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={{ uri: uri }}
                    onError={(e) => console.error('Failed to load image:', e.nativeEvent.error)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 200,
    }
});

export default HeaderComponent;
