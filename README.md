# RN_picture_gallery
React Native picture gallary

Picture Gallery consists of:
  1. several Picture components;
  2. one default picture component which used to add new picture.
  
Image Gallery contains <b>picturesCount</b> and array of <b>deletedPictures</b>.

Picture Component creates picture view with features:
  1. displaying a square photo
  2. after clicking on it for the first time, the menu appears (below you can see how it looks like)
  3. when user click on a trash bin icon  -> component calls the method from props wich has reaction on this action
  4. when user click on a magnifier icon -> component will show modal window with full size picture
  5. the default picture allows to user to add a new image.
  
How it looks like:

<p align="center">
    <img src="https://user-images.githubusercontent.com/18067700/43211195-a341cd1c-9039-11e8-804b-8271e7a23b8b.jpg" >
</p>

---------------------------------------------

<p align="center">
    <img src="https://user-images.githubusercontent.com/18067700/43211241-c11b7414-9039-11e8-8d57-5b474e310f48.jpg" >
</p>

---------------------------------------------

<p align="center">
    <img src="https://user-images.githubusercontent.com/18067700/43211298-e2ccf83a-9039-11e8-88fb-3706ee320d91.jpg" >
</p>
