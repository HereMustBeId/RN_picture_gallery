import React, { Component } from 'react';
import {
   View,
   TouchableOpacity,
   Modal,
   Text,
   Dimensions,
   ImageBackground,
   TouchableWithoutFeedback
} from 'react-native';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import PictureController from './PictureController';
const pictureController = new PictureController();

import ImagePicker from 'react-native-image-crop-picker';
import Hr from '../Hr';
import Icon, { ICONS } from '../Icon';

import styles from './PictureStyle';

/**
 * this component make picture block with possibility to
 * view picture on a whole screen
 * delete picture
 */
class Picture extends Component {
   static propTypes = {
      afterLoadPicture: PropTypes.func,
      onDeletePicture: PropTypes.func
   };

   constructor (props) {
      super (props);

      //this._controller = pictureController;

      this._pictureKey = this.props.pictureKey !== undefined ? this.props.pictureKey : null;
      this._pictureSize = this.getDimensionsSize();

      this.state = {
         addPictureMenuVisible: false,
         image: this.props.image || null,
         pictureMenu: false,
         pictureInModal: false
      }
   }

   get pictureKey () {
      return this._pictureKey;
   }

   get pictureSize () {
      return this._pictureSize;
   }

   /**
    * return state to default
    */
   setDefaultState () {
      this.setState({
         addPictureMenuVisible: false,
         image: this.props.image || null,
         pictureMenu: false,
         pictureInModal: false
      });
   }

   componentWillUpdate () {
      if (this.props.stateStore.picture.baseComponentWasTouched) {
         this.state.pictureMenu = false;
      }
   }

   /**
    * Get Width/Height value from dimensions for picture
    * @returns {number}
    */
   getDimensionsSize () {
      const dimensions = Dimensions.get('window');
      return Math.floor(dimensions.width <= dimensions.height ? dimensions.width : dimensions.height);
   }

   /**
    * upload picture by picker
    */
   uploadPhotoPicker () {
      ImagePicker.openPicker({
         width: this.pictureSize,
         height: this.pictureSize,
         cropping: true
      }).then( (image) => {
         this.uploadPictureCallback(image);
      });
   }

   /**
    * upload picture by camera
    */
   uploadPhotoCamera () {
      ImagePicker.openCamera({
         width: this.pictureSize,
         height: this.pictureSize,
         cropping: true
      }).then(image => {
         this.uploadPictureCallback(image);
      });
   }

   /**
    * update state and call method from props if it needs
    * @param image
    */
   uploadPictureCallback (image) {
      this.setState({
         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
      });
      this.changeMenuVisible();
      this.props.afterLoadPicture && this.props.afterLoadPicture(image);
   }

   /**
    * show/hide add picture menu
    */
   changeMenuVisible () {
      this.setState({
         addPictureMenuVisible: !this.state.addPictureMenuVisible
      });
   }

   /**
    * show/hide picture menu
    */
   pictureMenu () {
      this.setState({
         pictureMenu: !this.state.pictureMenu
      });
      if (this.state.pictureMenu) {
         this.props.activePictureMenu();
      }
   }

   /**
    * delete picture
    */
   deletePicture () {
      this.setDefaultState();
      this.props.onDeletePicture && this.props.onDeletePicture(this.pictureKey);
   }

   /**
    * show full picture
    */
   showHidePicture () {
      this.setState({
         pictureInModal: !this.state.pictureInModal,
         pictureMenu: false
      });
   }

   /**
    * make add picture menu
    * @returns {*}
    */
   renderMenu () {
      return (
         <Modal
            animationType={ 'slide' }
            transparent={ false }
            visible={ this.state.addPictureMenuVisible }
            onRequestClose={ this.changeMenuVisible.bind(this) } >
            <View style={ styles.addPictureMenu }>
               <View style={ styles.closeButton }>
                  <TouchableOpacity onPress={ this.changeMenuVisible.bind(this) }>
                     <Icon icon={ ICONS.clear } />
                  </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={ this.uploadPhotoCamera.bind(this) }>
                  <Text style={styles.addPictureText}> Сделать фото </Text>
               </TouchableOpacity>
               <Hr style={ styles.hrStyle } />
               <TouchableOpacity onPress={ this.uploadPhotoPicker.bind(this) }>
                  <Text style={styles.addPictureText}> Выбрать из галереи </Text>
               </TouchableOpacity>
            </View>
         </Modal>
      );
   }

   /**
    * main render method
    */
   render () {
      return (
         <View style={ [styles.mainContainer, this.props.imageStyle || {}] }>

            {/* Add picture menu */}
            { this.renderMenu() }

            {/* One picture view */}
            {
               !this.state.image &&
               <View style={[styles.imageBlock, this.props.imageStyle || {}]}>
                  <TouchableWithoutFeedback onPress={this.changeMenuVisible.bind(this)}>
                     <View style={ styles.imageBlock_inner }>
                        <Icon icon={ ICONS.camera }/>
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            }
            {
               !!this.state.image &&
               <TouchableWithoutFeedback onPress={ this.pictureMenu.bind(this) } >
                  <View style={ [styles.imageBlock, this.props.imageStyle || {}] }>
                     <ImageBackground style={ styles.picture } source={ this.state.image } />
                     {
                        this.state.pictureMenu &&
                        <View style={ styles.pictureMenu }>
                           <TouchableWithoutFeedback onPress={ this.deletePicture.bind(this) }>
                              <View style={ styles.pictureMenu_trash }>
                                 <Icon style={ styles.iconsPosition } icon={ ICONS.basket }/>
                              </View>
                           </TouchableWithoutFeedback>
                           <TouchableWithoutFeedback onPress={ this.showHidePicture.bind(this) }>
                              <View style={ styles.pictureMenu_lupe }>
                                 <Icon style={ styles.iconsPosition } icon={ ICONS.magnifier }/>
                              </View>
                           </TouchableWithoutFeedback>
                        </View>
                     }
                  </View>
               </TouchableWithoutFeedback>
            }

            {
               this.state.pictureInModal &&
               <Modal
                  animationType={ 'slide' }
                  transparent={ false }
                  visible={ this.state.pictureInModal }
                  onRequestClose={ this.showHidePicture.bind(this) }
                  closeOnClick={ true }>
                  <TouchableWithoutFeedback onPress={ this.showHidePicture.bind(this) }>
                     <ImageBackground style={ styles.backgroundPicture } source={ this.state.image } />
                  </TouchableWithoutFeedback>
               </Modal>
            }
         </View>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => pictureController.setGetDispatch(dispatch)
)(Picture);