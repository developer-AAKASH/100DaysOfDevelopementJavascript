import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';


export default function Post({ item, userDetail }) {

    const [ upVote, setUpVote] = useState(0);
    const [ downVote, setDownvote ] = useState(0);

    const upVotePost = ()=>{
        database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
            upVote: 1
        }) // set method helps to build the logic.
        .then(()=> console.log("Upvoted") )
    };

    const downVotePost = ()=>{
        database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
            downVote: 1
        }) // set method helps to build the logic.
        .then(()=> console.log("Downvoted...") )
    };

    useEffect(()=>{
        console.log(item);

        if( item.vote ){
            let upvote = 0;
            let downvote = 0;

            Object.values( item.vote ).map((val)=>{
                if( val.upVote ){
                    upvote += 1;
                } 

                if( val.downVote){
                    downvote += 1;
                }
            });

            setUpVote( upvote );
            setDownvote( downvote );
        }
    }, [ item ]);

    return (
            <Card
            style={{
                backgroundColor: '#0f4c75',
                borderColor: '#0f4c75',
            }}>
            <CardItem
                style={{
                backgroundColor: 'transparent',
                }}>
                <Left>
                <Thumbnail source={{uri: item.userImage}} small />
                <Body>
                    <Text
                    style={{
                        color: '#fdcb9e',
                    }}>
                    {item.by}
                    </Text>

                    <Text note>{item.location}</Text>
                </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image
                source={{uri: item.picture}}
                style={{height: 200, width: null, flex: 1}}
                />
            </CardItem>
            <CardItem
                cardBody
                style={{
                backgroundColor: 'transparent',
                }}>
                <Text
                numberOfLines={2}
                style={{
                    color: '#fff',
                }}>
                {item.description}
                </Text>
            </CardItem>

            <CardItem
                style={{
                backgroundColor: '#0f4c75',
                }}>
                <Left>
                <Button transparent onPress={upVotePost}>
                    <Icon
                    name="thumbs-up"
                    type="Entypo"
                    style={{fontSize: 20, color: '#fdcb9e'}}
                    />
                    <Text
                    style={{
                        color: '#fdcb9e',
                    }}>
                    {upvote}
                    </Text>
                </Button>
                <Button transparent onPress={downVotePost}>
                    <Icon
                    name="thumbs-down"
                    type="Entypo"
                    style={{fontSize: 20, color: '#fdcb9e'}}
                    />
                    <Text
                    style={{
                        color: '#fdcb9e',
                    }}>
                    {downvote}
                    </Text>
                </Button>
                </Left>
                <Right>
                <Button
                    transparent
                    iconLeft
                    onPress={() => {
                    Linking.openURL(`instagram://user?username=${item.instaId}`);
                    }}>
                    <Text
                    style={{
                        color: '#fdcb9e',
                    }}>
                    Open in
                    </Text>
                    <Icon
                    name="instagram"
                    type="Feather"
                    style={{fontSize: 20, color: '#fdcb9e'}}
                    />
                </Button>
                </Right>
            </CardItem>
            </Card>
        );
}
