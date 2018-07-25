import {
   Dimensions,
   StyleSheet
} from "react-native";

const dimensions = Dimensions.get('window');
const defaultOneImageSize = (dimensions.width <= dimensions.height ? dimensions.width : dimensions.height) / 3 - 40;

const styles = {
   galleryContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
   },
   oneImageStyle: {
      width: defaultOneImageSize,
      height: defaultOneImageSize,
   },

   onePictureWithTopMargin: {
      marginTop: 10,
   },
};

export default StyleSheet.create(styles);