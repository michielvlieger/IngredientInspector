import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageStyle, ViewStyle, Dimensions, useColorScheme } from 'react-native';
import { Colors } from '@constants';

interface HeaderComponentProps {
    uri: string;
    headerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    isHeader?: boolean; // New prop to indicate if the image is a header
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ uri, headerStyle, imageStyle, isHeader }) => {
    const colorScheme = Colors[useColorScheme() ?? 'light'];
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            const aspectRatio = width / height;
            if (isHeader) {
                setImageDimensions({ width: Dimensions.get('window').width, height: Dimensions.get('window').width / aspectRatio });
            } else {
                setImageDimensions({ width: 100 * aspectRatio, height: 100 });
            }
        });
    }, [uri, isHeader]);

    return (
        <View style={[styles.header, isHeader && styles.headerFullWidth, { backgroundColor: colorScheme.background }, headerStyle]}>
            {imageDimensions.width > 0 && (
                <Image
                    style={[
                        { width: imageDimensions.width, height: imageDimensions.height },
                        imageStyle
                    ]}
                    source={{ uri }}
                    resizeMode={isHeader ? "cover" : "contain"}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerFullWidth: {
        height: 200, // Adjust height as needed for full-width headers
    },
    image: {
        height: 100,
    },
});

export default HeaderComponent;
