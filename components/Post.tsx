import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
const { height } = Dimensions.get('window');
const FOOTER_HEIGHT = 90;

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const correctGif = require('../assets/correct.gif');
const wrongGif = require('../assets/wrong.gif');

interface Option {
    id: string;
    answer: string;
}
interface User {
    name: string;
    avatar: string;
}
interface PostProps {
    id: number;
    playlist: string;
    description: string;
    imageURL: string;
    question: string;
    options: Option[];
    user: User;
}

const Post: FC<PostProps> = ({ id, playlist, description, imageURL, question, options, user }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [correctOption, setCorrectOption] = useState<string | null>(null);

    useEffect(() => {
        const fetchCorrectOption = async () => {
            try {
                const response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCorrectOption(data.correct_options[0]?.id);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchCorrectOption();
    }, [id]);

    const handleSubmit = (optionId: string) => {
        setSelectedOption(optionId);
    };

    return (
        <ImageBackground source={{ uri: imageURL }} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.contentContainer}>
                <View />
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{question}</Text>
                </View>
                <View style={styles.bottomContent}>
                <View style={styles.optionsAndActionContainer}>
                        <View style={styles.optionsContainer}>
                            {options.map((option) => {
                                const isSelected = selectedOption === option.id;
                                const isCorrect = correctOption === option.id;
                                const backgroundColor = isSelected
                                    ? isCorrect
                                        ? 'green'
                                        : 'red'
                                    : isCorrect && selectedOption !== null
                                    ? 'green'
                                    : 'rgba(255, 255, 255, 0.3)';

                                return (
                                    <View key={option.id} style={styles.optionContainer}>
                                        <TouchableOpacity
                                            style={[styles.optionButton, { backgroundColor }]}
                                            onPress={() => handleSubmit(option.id)}>
                                            <Text style={styles.optionText}>{option.answer}</Text>
                                            {isSelected &&
                                                (isCorrect ? (
                                                    <Image source={correctGif} style={styles.gifIconCorrect} />
                                                ) : (
                                                    <Image source={wrongGif} style={styles.gifIconWrong} />
                                                ))}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={styles.rightSideSection}>
                            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                            <TouchableOpacity style={styles.addButton}>
                                <FontAwesome6 name="add" size={23} color="white" />
                            </TouchableOpacity>
                            <View style={styles.actionButtons}>
                                <View style={styles.actionButtonContainer}>
                                    <TouchableOpacity>
                                        <AntDesign name="heart" size={30} color="white" />
                                    </TouchableOpacity>
                                    <Text style={styles.actionButtonText}>87</Text>
                                </View>
                                <View style={styles.actionButtonContainer}>
                                    <TouchableOpacity>
                                        <FontAwesome name="commenting" size={30} color="white" />
                                    </TouchableOpacity>
                                    <Text style={styles.actionButtonText}>2</Text>
                                </View>
                                <View style={styles.actionButtonContainer}>
                                    <TouchableOpacity>
                                        <FontAwesome name="bookmark" size={30} color="white" />
                                    </TouchableOpacity>
                                    <Text style={styles.actionButtonText}>203</Text>
                                </View>
                                <View style={styles.actionButtonContainer}>
                                    <TouchableOpacity>
                                        <FontAwesome name="share" size={30} color="white" />
                                    </TouchableOpacity>
                                    <Text style={styles.actionButtonText}>17</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.authorDescriptionContainer}>
                        <Text style={styles.authorName}>{user.name}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.playlistContainer}>
                        <Text style={styles.playlistText}>
                            <Entypo name="folder-video" size={15} color="white" />
                        </Text>
                        <Text style={styles.playlistText2}>Playlist: {playlist}</Text>
                        <Text style={styles.playlistText}>
                            <Text style={styles.playlistIcon}>
                                <AntDesign name="caretright" size={15} color="white" />
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: height - FOOTER_HEIGHT,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionsAndActionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingRight: 10,
    },
    rightSideSection: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 0,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 15,
        borderColor: 'white',
        borderWidth: 2,
    },
    addButton: {
        marginTop: -27,
        marginBottom: 20,
        borderRadius: 25,
        backgroundColor: '#336133',
    },
    actionButtons: {
        alignItems: 'center',
    },
    actionButtonContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    actionButtonText: {
        color: '#ffffff',
        marginTop: 5,
    },
    questionContainer: {
        marginTop: 100,
        padding: 20,
        alignItems: 'flex-start',
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
    },
    bottomContent: {
        justifyContent: 'flex-end',
    },
    optionsContainer: {
        marginTop: 60,
        padding: 10,
        paddingBottom: 20,
    },
    optionContainer: {
        marginTop: -5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        maxWidth: 320,
        minWidth: 320,
        minHeight: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        color: '#ffffff',
        fontSize: 14,
        maxWidth: 250,
    },
    gifIconCorrect: {
        width: 50,
        height: 45,
        marginLeft: 10,
        marginTop: -10,
    },
    gifIconWrong: {
        width: 50,
        height: 45,
        marginBottom: -20,
        marginLeft: 10,
        transform: 'scaleY(-1)',
    },
    authorDescriptionContainer: {
        marginTop: -55,
        padding: 10,
        paddingBottom: 20,
    },
    authorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#ffffff',
        maxWidth: 350,
    },
    playlistContainer: {
        width: '100%',
        backgroundColor: 'rgba(64, 66, 64, 0.7)',
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        justifyContent: 'space-between',
    },
    playlistText: {
        color: '#ffffff',
        fontSize: 14,
    },
    playlistText2: {
        color: '#ffffff',
        fontSize: 14,
        marginRight: 130,
    },
    playlistIcon: {
        fontWeight: 'bold',
    },
});

export default Post;
