import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking, FlatList } from 'react-native';
import Logo from '../assets/images/appiness.png'
import styles from '../style';
import { connect } from 'react-redux'
import { loggedOut } from '../storage/action'
import profile from '../assets/images/profile.png'
import logout from '../assets/images/Logout.png'
import { widthPercentageToDP } from '../const';
import { EMPLOYEE_LIST } from '../config/EmployeeList'
import { StackActions, NavigationActions } from 'react-navigation';

const onlogOff = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
})

class Homepage extends Component {
    constructor(props){
        super(props)
        this.state={
            profile : props.profile,
            user : EMPLOYEE_LIST.user
            
        }
    }
    callLogout = () =>{
        this.props.loggedOut()
        this.props.navigation.dispatch(onlogOff)
    }
    
    _renderEmployeeList = (rowItem) => {
        const {item, index}  = rowItem;
        console.log(item)
        return (
            <View style={{backgroundColor:'#d4d4d4', width :'90%', alignSelf:'center',borderColor:'grey',borderWidth:1,borderRadius:10,paddingHorizontal :10, paddingVertical : 10,  marginTop :10,justifyContent :'center', flexDirection: "row"}} key={index}>
                <View style ={{flex : 1.2, alignItems :'center', justifyContent :'center'}}>
                    <Image source={profile} style={{height : 75, width : 70}}/>
                </View>
                <View style ={{flex : 2.8}}>
                    <Text style={{ color: '#000', fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Name : </Text>{item.name}</Text>
                    <View style={{flexDirection:'row',marginTop:3, justifyContent :'space-between'}}>
                        <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={1}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Age : </Text>{item.age}</Text>
                        <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={2}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Gender : </Text>{item.gender}</Text>
                    </View>
                    <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Email : </Text>{item.email}</Text>
                    <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start'}} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Mobile number : </Text>{item.phoneNo}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container>
                    <View style ={{backgroundColor :'#c3c3c3', height :50,alignItems :'center', flexDirection:'row'}}>
                        <View style ={styles.homepage_header}>
                            <Text style={styles.homepage_text}>Home page</Text>
                        </View>
                        <View style ={{flex : 0.8}}>
                            <TouchableOpacity onPress={this.callLogout} style ={{alignSelf:'center'}}>
                                <Image source={logout} style={{ height : 30, width:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Content ref={c => this._content = c}>
                        <View style={styles.homepage_wrapper}>
                            <View style={styles.signup_imageView}>
                                <Image source={Logo} style={styles.signup_image_path} />
                            </View>
                        </View>
                        <FlatList
                            data={this.state.user}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderEmployeeList}
                            style={{marginBottom:20}}
                        />
                    </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.authReducer.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loggedOut: () => dispatch(loggedOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)