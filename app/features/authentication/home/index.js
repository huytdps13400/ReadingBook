import { View, Text, StyleSheet,Dimensions ,FlatList,ImageBackground,Image,ScrollView,TouchableOpacity} from "react-native";
import React,{useEffect,useState} from "react";
import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from 'react-native-snap-carousel';
import { firebase } from "../../../../config/firebaseconfig";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { routesName } from "../../../navigation/routes";

const dataCategory = [
  { label: "Chính trị – pháp luật", value: 7 },
  { label: "Khoa học công nghệ – Kinh tế", value: 1 },
  { label: "Văn học nghệ thuật", value: 2 },

  { label: "Văn hóa xã hội – Lịch sử", value: 3 },
  { label: "Giáo trình", value: 4 },

  { label: "Truyện, tiểu thuyết", value: 5 },
  { label: "Tâm lý, tâm linh, tôn giáo", value: 6 },

  { label: "Sách thiếu nhi", value: 6 },


];
const {width} = Dimensions.get('window');
const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [DataBook, setDataBook] = useState([]);

  useEffect(async () => {
    const userRef = firebase.default.database().ref('/Book');

    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setDataBook([]);
      snapshot.forEach(function (childSnapshot) {
        if(firebase.default.auth()?.currentUser?.uid === childSnapshot.val()?.uid){
          setDataBook((users) => [...users, childSnapshot.val()]);
          console.log('alal',childSnapshot.val())
        }
        
      });
    });
    return () => {
      userRef.off('value', OnLoadingListener);
    
    };
  }, [isFocused]);
const  _renderItem = ({item, index}) => {
  return (
      <ImageBackground imageStyle={{
        borderRadius: 5,
        height:200,
        width:width-32
       
       }}
       style={{
        height:200,
        width:width-32
       }}
       source={{uri:item.imageUrl}}>
          <Text style={{fontSize: 30,position:'absolute',bottom:50,left:10,color:'white'}}>{item.nameBook}</Text>
          <Text style={{fontSize: 20,position:'absolute',bottom:20,left:10,color:'white'}}>{item.author}</Text>

      </ImageBackground>
  );
}
const _renderItemBook =({item,index})=>{
  const category = dataCategory.filter((v)=> v?.value ===item?.category)[0]?.label;
  return(
    <TouchableOpacity style={{width :(width-32),
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical:10,
    borderRadius:8,
    elevation: 5,
    paddingBottom:10,
    marginHorizontal:16
    }}>
      <Image style={{width:(width-32) ,height:100,borderTopLeftRadius:8,borderTopRightRadius:8}} source={{uri:item.imageUrl}}/>
    <View style={{margin:10}}>
    <Text style={{fontSize:16,marginBottom:10}}>{item.nameBook}</Text>
    <Text style={{fontSize:16,marginBottom:10}}>{item.author}</Text>
    <Text style={{fontSize:16}}>{category}</Text>

    </View>
    </TouchableOpacity>
  )
}
  return (
    <View style={[styles.container,{paddingTop:inset.top }]}>

      <ScrollView style={{
       
        flex:1
      }}
      showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:16}}>

      <Text style={{fontSize:20,fontWeight:'bold'}}>DashBoard</Text>
      <View style={{height:30}}/>
      {DataBook ?(
         <Carousel
         data={DataBook?.slice(0,5)}
         renderItem={_renderItem}
         sliderWidth={width-32}
         itemWidth={width-32}
         loop
         autoplay
         autoplayDelay={3000}
         horizontal
       />
      ):null}
     
                  <View style={{height:30}}/>

            <Text style={{fontSize:20,fontWeight:'bold'}}>List Book</Text>
            <View style={{height:30}}/>

      
            </View>  
      <FlatList
            data={DataBook}
            renderItem={_renderItemBook}
            keyExtractor={(item,index)=> item.id.toString()}
            
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={()=>{
              return(
                <View style={{width:10}}/>
              )
            }}
            />
                         <View style={{ height: inset.bottom + 100 }} />
                         </ScrollView>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
