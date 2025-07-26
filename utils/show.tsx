import BlogCard from "@/components/BlogCard"; // <- your card component
import tw from "@/lib/tailwind";
import { useLazyBlogsQuery } from "@/redux/apiSlices/blogsSlices"; // <-- update with your correct path
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    View
} from "react-native";

const BlogScreen = () => {
  const [page, setPage] = useState(1);
  const [blogList, setBlogList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [fetchBlogs, { isLoading, isFetching }] = useLazyBlogsQuery();

  const loadBlogs = useCallback(async () => {
    if (loadingMore || isLoading || isFetching) return;
    setLoadingMore(true);

    try {
      const res = await fetchBlogs({ page }).unwrap();
      if (res?.status && res?.data?.length) {
        setBlogList((prev) => [...prev, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, isLoading, isFetching]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetchBlogs({ page: 1 }).unwrap();
      if (res?.status) {
        setBlogList(res.data);
        setPage(2);
      }
    } catch (err) {
      console.error("Refresh failed", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={blogList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BlogCard blog={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ED6237"]}
          />
        }
        onEndReached={() => {
          if (blogList.length >= 10) {
            loadBlogs();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#ED6237" style={tw`my-4`} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BlogScreen;
