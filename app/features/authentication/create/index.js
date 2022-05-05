import { View, Text,StyleSheet ,ScrollView,Dimensions,Alert,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Header from '../../../components/Header';
import { theme } from '../../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import Icons from "@expo/vector-icons/Ionicons";
import TextInputForm from "../../../components/TextInputForm";
import Button from "../../../components/Button";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../../config/firebaseconfig";
import { useNavigation } from '@react-navigation/native';
import { routesName } from '../../../navigation/routes';

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
const { width } = Dimensions.get("window");

const CreateScreen = () => {
  const inset = useSafeAreaInsets();
  const [category ,setCategory] = useState(dataCategory[0].value);
  const [description ,setDescription] = useState('');
  const [nameBook ,setNameBook] = useState('');
  const [author ,setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
const navigation = useNavigation()
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(`${result.uri}`);
    }
  };
  async function uploadImageAsync(uri) {
    const  user = firebase.default.auth().currentUser;
    let imageUrl=''
    if(uri){
      const blob = await new Promise((resolve, reject) => {
        setIsLoadingImage(true);



        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);

      });
      const uid22 =uuid.v4();
      const fileRef = firebase.default.storage().ref('Book/'+uid22);
      const result = await  firebase.default.storage().ref('Book/'+uid22).put( blob).then(()=>{
         fileRef.getDownloadURL().then((url)=>{
          imageUrl=url; 
          if(url){
            const key = firebase.database().ref('Book/').push().key;

              const data ={  
                author,
                nameBook,
               description,
               category,
               uid:user?.uid,
                imageUrl:url,
                id:key
              
                }
              firebase.default.database().ref('Book/'+key).update(data).then(()=>{
                clearInput();
                Alert.alert(
                        "Success",
                        "Congratulations on your successful save",
                        [
                          {
                            text: "OK",
                            onPress: () =>
                              navigation.navigate(routesName.HOME_SCREEN),
                          },
                        ]
                      );
              
              }).catch((error) => {
                console.error(error)
              })
       
            return;
          }
         });
      }); 
      blob.close();
      setIsLoadingImage(false);
 
    }
      else{
        // const data ={  
        //   address: address,
        //   email: profile?.email,
        //   username,
        //   phone,
        //   age}
        //   console.log('data',data)
        // firebase.default.database().ref('User/'+uid).update(data).then(()=>{
        //   Alert.alert(
        //           "Success",
        //           "Congratulations on your successful save",
        //           [
        //             {
        //               text: "OK",
        //               onPress: () =>
        //                 navigation.navigate(routesName.PROFILE_SCREEN),
        //             },
        //           ]
        //         );
        
        // }).catch((error) => {
        //   console.log(error,'kaka')
        // })
      }

  }
  const clearInput = () => {
    setAuthor("");
    setDescription("");
    setImage("");
    setNameBook("");
    setCategory(dataCategory[0].value)
  };
  const onPressSave =async() =>{
    try {
      if(description && category && nameBook && image && author){
        uploadImageAsync(image)

      }else{
        console.log('isChecl',description && Boolean(category) && nameBook && image && author,description,category)
        Alert.alert(
          "Error",
          "Vui lòng điền đầy đủ thông tin",
          [
            {
              text: "OK",
              style:'cancel',
             
            },
          ]
        );
      }
    } catch (error) {
      
    }
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title={'Create Book'}/>
      <ScrollView>
      <View style={{marginHorizontal:16,marginVertical:10}}>
      <TextInputForm
          placeholder={"Name Book"}
          style={{
            marginVertical: 10,
            borderRadius: 4,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderColor: theme.colors.lightGray,
          }}
          inputStyle={{
            height: width / 2,
          }}
          value={nameBook}
          label="Name Book"
          onChangeText={(text) => setNameBook(text)}
        />
      <Text style={{ marginVertical: 10 }}>Choose Category</Text>
     
      <RNPickerSelect
          items={dataCategory}
          onValueChange={(value) => {
            setCategory(value);
          }}
          Icon={() => (
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <Icons name="chevron-down-outline" size={24} />
            </View>
          )}
          style={pickerSelectStyles}
          value={category}
          useNativeAndroidPickerStyle={false}
          key={`key` + 2}
       />

       <View style={{height:10}}/>
       <TextInputForm
          placeholder={"author"}
          style={{
            marginVertical: 10,
            borderRadius: 4,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderColor: theme.colors.lightGray,
          }}
          inputStyle={{
            height: width / 2,
          }}
          value={author}
          label="Author"
          onChangeText={(text) => setAuthor(text)}
        />
        <TextInputForm
          placeholder={"Description"}
          style={{
            borderWidth: 1,
            borderColor: theme.colors.placeholder,
            borderRadius: 4,
            paddingHorizontal: 12,
            height: width / 2,
          }}
          inputStyle={{
            height: width / 2,
          }}
          value={description}
          multiline={true}
          label="Description"
          onChangeText={(text) => setDescription(text)}
          textAlignVertical={"top"}
        />
              <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: "https://png.pngitem.com/pimgs/s/244-2446110_transparent-social-media-clipart-black-and-white-choose.png",
            }}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
             {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: width - 32, height: width / 2 }}
          />
        ) : null}
               <Button
          isLoading={isLoadingImage }
          disabled={isLoadingImage}
          title="Save"
          backgroundColor={theme.colors.orange}
          onPress={() => {
            onPressSave();
            
          }}
        />
             </View>
             <View style={{ height: inset.bottom + 100 }} />

             </ScrollView>

       </View>
  )
}

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, 
  // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});