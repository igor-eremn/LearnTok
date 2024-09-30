import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from './pages/Home';


const Layout = () => {
    const [minutes, setMinutes] = useState(0);
    const [currentPage, setCurrentPage] = useState('Home');

    useEffect(() => {
        const timer = setInterval(() => {
            setMinutes((prevMinutes) => prevMinutes + 1);
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const renderContent = () => {
        if (currentPage === 'Home') {
            return <Home />;
        } else {
            return (
                <View style={styles.otherContent}>
                    <Text style={styles.mainText}>{currentPage} is Opened!</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableOpacity style={styles.topMenuItem}>
                    <Text style={styles.topMenuText}>🕒 {minutes} min</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topMenuItem}>
                    <Text style={styles.topMenuText}>For You</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topMenuItem}>
                    <Text style={styles.topMenuText}>
                        <FontAwesome name="search" size={24} color="white" />
                    </Text>
                </TouchableOpacity>
            </View>

            {renderContent()}

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => setCurrentPage('Home')}>
                    <Ionicons name="home" size={24} color="white" />
                    <Text style={styles.bottomMenuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => setCurrentPage('Discover')}>
                    <Entypo name="compass" size={24} color="white" />
                    <Text style={styles.bottomMenuText}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => setCurrentPage('Activity')}>
                    <MaterialIcons name="timer" size={24} color="white" />
                    <Text style={styles.bottomMenuText}>Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => setCurrentPage('Bookmarks')}>
                    <FontAwesome name="bookmark" size={24} color="white" />
                    <Text style={styles.bottomMenuText}>Bookmarks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem} onPress={() => setCurrentPage('Profile')}>
                    <FontAwesome name="user-circle-o" size={24} color="white" />
                    <Text style={styles.bottomMenuText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10,
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    topMenuItem: {
        flex: 1,
        alignItems: 'center',
    },
    topMenuText: {
        color: '#fff',
        fontSize: 16,
    },
    mainContent: {
        padding: 20,
        paddingTop: 120,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#132f30',
    },
    mainText: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 10,
    },
    otherContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#132f30',
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#000',
        borderTopColor: '#959aa1',
        borderTopWidth: 1,
        marginBottom: 20,
        height: 70,
    },
    bottomMenuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomMenuText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 6,
    },
});

export default Layout;