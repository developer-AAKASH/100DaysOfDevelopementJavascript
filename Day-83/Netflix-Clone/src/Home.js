import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { useEffect } from 'react';
import { AuthContext } from "./context";
import { StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';

const Home = ({ navigation })=>{
    const { signOut } = React.useContext( AuthContext );
    const [ userDetail, setUserDetail ] = useState({
        email: "",
        userName: "",
        id: "",
        phoneNo: "",
    });

    const getUserData = ( uid )=>{
        database()
        .ref(`Users/${uid}`)
        .on("value", ( snapshot )=>{
            setUserDetail({
                email: snapshot.val().email,
                userName: snapshot.val().userName,
                id: snapshot.val().id,
                phoneNo: snapshot.val().phoneNo
            })
        })
    };

    useEffect(()=>{
        const user = auth().currentUser;
        getUserData( user.uid )
    }, []);

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#191414",
                paddingTop: StatusBar.currentHeight,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <TouchableOpacity>
                <Text style={{ color: "white" }}>Hello { userDetail.userName }</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ ()=>{
                    auth()
                    .signOut()
                    .then(()=>{
                        console.log("User Signed out !!!");
                        signOut();
                        // navigation.navigate("SignIn");
                    })
                }}
                style={{ padding: 40 }}
            >
                <Text style={{ color: "white" }}>LOGOUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;