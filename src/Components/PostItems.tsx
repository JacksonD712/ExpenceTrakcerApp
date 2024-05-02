import React from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';

interface Post {
  _id: string;
  title: string;
  image_url?: string;
  link: string;
}

interface PostItemProps {
  item: Post;
}

const PostItem: React.FC<PostItemProps> = ({item}) => (
  <View style={styles.postContainer}>
    {item.image_url && (
      <Image source={{uri: item.image_url}} style={styles.image} />
    )}
    <Text style={styles.title} onPress={() => Linking.openURL(item.link)}>
      {item.title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PostItem;
