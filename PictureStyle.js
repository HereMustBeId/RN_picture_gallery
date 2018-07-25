import {
   Dimensions,
   StyleSheet
} from "react-native";
import generalStyles from "../../config/style";

const dimensions = Dimensions.get('window');
const defaultOneImageSize = (dimensions.width <= dimensions.height ? dimensions.width : dimensions.height) - 40;

const styles = {
   mainContainer: {
   },
   imageBlock: {
      width: defaultOneImageSize,
      height: defaultOneImageSize,
      borderWidth: 1,
      borderColor: generalStyles.colors.steel,
      display: 'flex',
   },
   imageBlock_inner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   picture: {
      flex: 1,
   },
   backgroundPicture: {
      flex: 1
   },
   addPictureMenu: {
      flex: 1,
      justifyContent: 'center',
      borderWidth: 1,
   },
   addPictureText: {
      ...generalStyles.fonts.h2,
      color: generalStyles.colors.blue,
      textAlign: 'center',
      padding: generalStyles.sizes.one,
      margin: 'auto'
   },
   hrStyle: {
      marginLeft: 30,
      marginRight: 30,
   },
   closeButton: {
      position: 'absolute',
      top: 10,
      right: 10
   },
   pictureMenu: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      display: 'flex',
      flexDirection: 'row'
   },
   pictureMenu_trash: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
   },
   pictureMenu_lupe: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: 1,
      borderColor: generalStyles.colors.white
   },
   backgroundView: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderWidth: 1,
      borderColor: '#FFF'
   }
};

export default StyleSheet.create(styles);