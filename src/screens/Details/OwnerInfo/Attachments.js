import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableNativeFeedback,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageComponent from '../../../components/Shared/ImageComponent';
import {widthPerc, heightPerc} from '../../../helpers/styleHelper';
import Ripple from 'react-native-material-ripple';
import TextComponent from '../../../components/Shared/TextComponent';
import {Colors} from '../../../constants/ThemeConstants';
import {FontType, GET, API_IP} from '../../../constants/AppConstants';
import Services from '../../../services';

const images = [
  {
    name: 'License',
    url:
      'https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/1/4a/14a842eb-b21a-5ce6-ad64-b98970d0f579/5d0ba9ff06613.image.jpg',
  },
  {
    name: 'Pollution certificate',
    url:
      'https://i.pinimg.com/originals/bf/db/37/bfdb3796f2848739ade77e73e905068e.jpg',
  },
];

const Attachments = ({Attachments = []}) => {
  Attachments.map(
    (data) => (data.url = `${API_IP}file/download/${data.fileId}`),
  );
  const [ModalVisible, setModalVisible] = useState(false);
  const [Index, setIndex] = useState(0);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      {Attachments.map((data, i) => (
        <View
          key={i}
          style={{
            width: widthPerc(95),
            minHeight: heightPerc(30),
            alignItems: 'center',
            backgroundColor: Colors.white,
            marginVertical: 3,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIndex(i);
              setModalVisible(true);
            }}
            rippleContainerBorderRadius={10}
            style={{
              elevation: 10,
              backgroundColor: Colors.white,
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: Colors.primaryThemeColor,
            }}>
            <View
              style={{
                overflow: 'hidden',
              }}>
              <View
                style={{
                  // flex: 1,
                  backgroundColor: Colors.primaryThemeColor,
                  height: heightPerc(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextComponent
                  type={FontType.BOLD}
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    paddingVertical: 10,
                    color: Colors.white,
                  }}>
                  {data.name}
                </TextComponent>
              </View>
              <View
                style={{
                  width: widthPerc(95),
                  borderRadius: 10,
                  height: heightPerc(30),
                }}>
                <ImageComponent source={{uri: data.url}} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        visible={ModalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={Attachments}
          index={Index}
          onSwipeDown={() => {
            setModalVisible(false);
          }}
          onMove={(data) => console.log(data)}
          enableSwipeDown={true}
        />
      </Modal>
    </ScrollView>
  );
};

export default Attachments;
