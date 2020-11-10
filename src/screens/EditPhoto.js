import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function EditPhoto() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  // Constante responsável por selecionar imagem.
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      title: "Selecione uma foto",
      takePhotoButtonTitle: "Usar a câmera...",
      chooseFromLibraryButtonTitle: "Escolher da galeria...",
      cancelButtonTitle: "Cancelar",
      storageOptions: {
        skipBackup: true,
        path: 'FoodNow Profile Photos'
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  // Constante responsável por enviar a imagem para o Storage do Firebase.
  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    setUploading(true);
    setTransferred(0);

    // Pegar UID do usuário para fazer uma referência na hora de criar a pasta no Storage.
    var user = firebase.auth().currentUser;
    var userId = user.uid;

    const task = storage()
      .ref('/profileImages/' + userId + '/image_profile_user')
      .putFile(uploadUri)

    // Definir estado de progresso.
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    // Pegando a URL da imagem que foi feito o upload.
    storage()
      .ref('/profileImages/' + userId + '/image_profile_user')
      .getDownloadURL()
      .then(downloadUrl => {
        console.log(downloadUrl);
        var photoUrl = downloadUrl;

        // Mandando a URL da imagem que usuário fez o upload para o banco de dados.
        database()
          .ref('users/' + userId)
          .update({
            photoUrl: photoUrl,
          })
      });

    Alert.alert(
      'Sucesso!',
      'Sua foto de perfil foi atualizada.'
    );

    setImage(null);

  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonTextSelect}>Escolher Imagem</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonTextUpload}>Upload</Text>
              <Icon name="cloud-upload" size={22} color="#FFF" />
            </TouchableOpacity>
          )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectButton: {
    marginTop: 30,
    borderRadius: 10,
    width: 180,
    height: 50,
    backgroundColor: '#F5872B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 10,
    width: 180,
    height: 50,
    backgroundColor: '#006100',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    flexDirection: 'row'
  },
  buttonTextSelect: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonTextUpload: {
    color: '#FFF',
    fontSize: 18,
    paddingRight: 12
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});