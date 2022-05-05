import { View, Text, StyleSheet,Dimensions,Linking ,FlatList,ImageBackground,Image,ScrollView,TouchableOpacity} from "react-native";
import React,{useEffect,useState} from "react";
import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from 'react-native-snap-carousel';
import { firebase } from "../../../../config/firebaseconfig";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { routesName } from "../../../navigation/routes";
import TextInputForm from "../../../components/TextInputForm";
export const API_BOOKS_KEY = 'AIzaSyB-OtACxBjF7rAudHEmIH_vT_CAu2d6p5U';
export const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books';
export const KEY_HEADER = '&key=' + API_BOOKS_KEY;
export const ALL_EBOOKS_ENDPOInT = '/v1/volumes?q=';
export const FREE_BOOKS_ENPOINT = '/v1/volumes?q=flowers&filter=free-ebooks';
export async function getData(url, endpoint) {
  try {
    const fullURL = url + endpoint;
    console.log(fullURL);
    const response = await fetch(fullURL);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error.toString();
  }
}
export const getAllEbooks = async bookName => {
  const endpoint =
   ALL_EBOOKS_ENDPOInT + bookName+'&maxResults=40' + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};
export const getFreeEBooks = async () => {
  const endpoint = FREE_BOOKS_ENPOINT + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};
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
  const [keyword, setKeyword] = useState('');

  // useEffect(async () => {
  //   const userRef = firebase.default.database().ref('/Book');

  //   const OnLoadingListener = userRef.on('value', (snapshot) => {
  //     setDataBook([]);
  //     snapshot.forEach(function (childSnapshot) {
  //       if(firebase.default.auth()?.currentUser?.uid === childSnapshot.val()?.uid){
  //         setDataBook((users) => [...users, childSnapshot.val()]);
  //         console.log('alal',childSnapshot.val())
  //       }
        
  //     });
  //   });
  //   return () => {
  //     userRef.off('value', OnLoadingListener);
    
  //   };
  // }, [isFocused]);
  useEffect(async()=>{
await getAllEbooks(keyword).then((res)=>{
setDataBook(res.items);
console.log({data:res.items})
});


  },[isFocused,keyword])
  
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
       source={{uri: typeof item?.volumeInfo?.authors !== 'undefined' ?item.volumeInfo?.imageLinks?.thumbnail.replace('zoom=1','zoom=2'):''}}>
          <Text style={{fontSize: 30,position:'absolute',bottom:50,left:10,color:'black'}}>{item?.volumeInfo?.title}</Text>
          <Text style={{fontSize: 20,position:'absolute',bottom:20,left:10,color:'black'}}>{item.author}</Text>

      </ImageBackground>
  );
}
const _renderItemBook =({item,index})=>{
  console.log('kaka', )
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
    }}
    onPress={()=>{
      Linking.openURL(item?.volumeInfo?.previewLink)
    }}>
      <Image 
      resizeMode='contain'
      style={{width:(width-32) ,height:300,borderTopLeftRadius:8,borderTopRightRadius:8}} source={{uri:item.volumeInfo.imageLinks.thumbnail.replace('zoom=1','zoom=50')}}/>
    <View style={{margin:10}}>
    <Text style={{fontSize:16,marginBottom:10}}>{item?.volumeInfo?.title}</Text>
    {
      typeof item?.volumeInfo?.authors !== 'undefined' && (
 item?.volumeInfo?.authors.map((item,index)=>{
        return(
          <Text style={{fontSize:16,marginBottom:10}}>{item}</Text>

        )
      })
      )
     
    }
    <Text style={{fontSize:16}}>{category}</Text>

    </View>
    </TouchableOpacity>
  )
}
const handleKeyword = React.useCallback((text)=>{
  setKeyword(text)
},[])
  return (
    <View style={[styles.container,{paddingTop:inset.top }]}>

      <ScrollView style={{
       
        flex:1
      }}
      showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:16}}>

      <Text style={{fontSize:20,fontWeight:'bold'}}>DashBoard</Text>
      <TextInputForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: theme.colors.lightGray,
                }}
                placeholder="Search Keyword...."
                value={keyword}
                onChangeText={(text)=> handleKeyword(text)}
           
              />
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
            contentContainerStyle={{flex:1}}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={()=>{
              return(
                <View style={{width:10}}/>
              )
            }}
            ListEmptyComponent={()=>{
              return(
                <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>No Data</Text>
                </View>
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
