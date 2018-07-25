import React, { Component } from 'react';
import { View } from 'react-native';

import Picture from '../picture/Picture';

import styles from './ImageGalleryStyle';

export default class ImageGallery extends Component {
   constructor (props) {
      super (props);

      this.state = {
         picturesCount: 1,
         deletedPictures: []
      }
   }

   /**
    * When picture is added - increment total count
    */
   addPicture (image) {
      this.setState({
         picturesCount: ++this.state.picturesCount
      });
      this.props.afterLoadPicture &&
      this.props.afterLoadPicture(image);
   }

   /**
    * When picture deleted - push picture key to array of deleted pictures
    * @param pictureKey
    */
   onDeletePicture (pictureKey) {
      let deletedPicturesArr = this.state.deletedPictures;
      deletedPicturesArr.push(pictureKey);
      this.setState({
         deletedPictures: deletedPicturesArr
      });
   }

   /**
    * Each picture increments total count of pictures.
    * If picture deleted, its key added to deletedPictures array in state and
    * total count will not change.
    * When it renders, pictures with key from deletedPictures array will not be rendered.
    * So delete function will do everything correctly without changing sequence.
    */
   renderPictures () {
      let count = this.state.picturesCount;
      let result = [];

      for (let i = 0; i < count; i++) {
         if (this.state.deletedPictures.indexOf(i) === -1) {
            result.push(
               <Picture
                  key={ i }
                  pictureKey={ i }
                  imageStyle={ [styles.oneImageStyle, (i - this.state.deletedPictures.length) > 2 ? styles.onePictureWithTopMargin: {}] }
                  afterLoadPicture={ this.addPicture.bind(this) }
                  onDeletePicture={ this.onDeletePicture.bind(this) }/>
            );
         }
      }

      /**
       * Empty block is needed because of flex and property 'space-between'
       * @type {number}
       */
      let actualCount = count - this.state.deletedPictures.length;
      if (actualCount === 2 || actualCount % 2 === 1) {
         result.push(
            <View key={count + 1} style={ styles.oneImageStyle }>
            </View>
         );
      }

      return result;
   }

   /**
    * Main render method
    * @returns {*}
    */
   render () {
      return (
         <View style={ [styles.galleryContainer] }>
            { this.renderPictures() }
         </View>
      );
   }
}