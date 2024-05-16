import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageStyle, ViewStyle, Dimensions } from 'react-native';

interface HeaderComponentProps {
    uri: string;
    headerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    isHeader?: boolean; // New prop to indicate if the image is a header
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ uri, headerStyle, imageStyle, isHeader }) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            if (isHeader) {
                const aspectRatio = width / height;
                setImageDimensions({ width: Dimensions.get('window').width, height: Dimensions.get('window').width / aspectRatio });
            } else {
                const aspectRatio = width / height;
                setImageDimensions({ width: 100 * aspectRatio, height: 100 });
            }
        });
    }, [uri, isHeader]);

    return (
        <View style={[styles.header, isHeader && styles.headerFullWidth, headerStyle]}>
            {imageDimensions.width > 0 && (
                <Image
                    style={[
                        isHeader ? { width: imageDimensions.width, height: imageDimensions.height } : { width: imageDimensions.width, height: imageDimensions.height },
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
        backgroundColor: '#f0f0f0',
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
