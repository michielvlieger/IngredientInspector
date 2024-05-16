import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

const HeaderComponent: React.FC<{ uri: string }> = ({ uri }) => {
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
                    style={styles.image}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Ensure background color contrasts with image
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default HeaderComponent;
