import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import Post from './Post';

const { height } = Dimensions.get('window');
const FOOTER_HEIGHT = 90;

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);

    interface Option {
        id: string;
        answer: string;
    }
    interface User {
        name: string;
        avatar: string;
    }
    interface Post {
        type: string;
        id: number;
        playlist: string;
        description: string;
        image: string;
        question: string;
        options: Option[];
        user: User;
    }

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchQuestions();
        fetchQuestions();
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / (height - FOOTER_HEIGHT));
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
        fetchQuestions();
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://cross-platform.rp.devfactory.com/for_you');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Post = await response.json();
            setPosts((prevPosts) => {
                if (!prevPosts.some((post) => post.id === data.id)) {
                    return [...prevPosts, data];
                }
                return prevPosts;
            });
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        playlist={post.playlist}
                        description={post.description}
                        imageURL={post.image}
                        question={post.question}
                        options={post.options}
                        user={post.user}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
