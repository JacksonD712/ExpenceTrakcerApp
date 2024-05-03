import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAccessToken,
  selectRefreshToken,
  setAccessToken,
  logout,
} from '../Redux/authSlice';
import PostItem from '../Components/PostItems';
import {getPosts} from '../api/api';
import axios from 'axios';
import styles from '../Style/NewsScreenStyle';

interface Post {
  _id: string;
  title: string;
  image_url?: string;
  link: string;
}

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0); // Add refresh count state
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      if (refreshCount >= 3) {
        dispatch(logout());
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
        return null;
      }

      const response = await axios.post(
        'https://backend-practice.euriskomobility.me/refresh-token',
        {
          refreshToken: refreshToken,
          token_expires_in: '0.3m',
        },
      );

      const newAccessToken: string = response.data.accessToken;
      console.log('New Access Token:', newAccessToken);
      dispatch(setAccessToken(newAccessToken));
      setRefreshCount(prevCount => prevCount + 1);
      return newAccessToken;
    } catch (error: any) {
      console.error('Error refreshing access token:', error);
      if (error.response && error.response.status === 403) {
        dispatch(logout());
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      }
      return null;
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await getPosts(currentPage, accessToken);
      setError(null);
      setPosts(prevPosts => [...prevPosts, ...response.data.results]);
      console.log(accessToken);
      setTotalPages(response.data.pagination.totalPages);
      setHasNextPage(response.data.pagination.hasNextPage);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        await refreshAccessToken();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchPosts().catch(error => {
        console.error('Error in useEffect:', error);
      });
    }
  }, [accessToken, currentPage]);

  const handlePageChange = () => {
    if (hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {posts.length > 0 ? (
        <>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => `${item._id}_${index}`}
            renderItem={({item}) => <PostItem item={item} />}
            onEndReached={handlePageChange}
            onEndReachedThreshold={0.1}
          />
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => setCurrentPage(prevPage => prevPage - 1)}
              disabled={currentPage === 1}>
              <Text style={styles.paginationText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              onPress={handlePageChange}
              disabled={!hasNextPage}>
              <Text
                style={[
                  styles.paginationText,
                  {opacity: hasNextPage ? 1 : 0.5},
                ]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No posts available.</Text>
      )}
    </View>
  );
};

export default NewsPage;
