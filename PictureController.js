import ReduxDispatcherController from "../../controllers/ReduxDispatcerController";

class PictureController extends ReduxDispatcherController {
   constructor () {
      super();

      this.setDispatcher({
         activePictureMenu: this.activePictureMenu.bind(this),
      });
   }

   activePictureMenu () {
      this.getDispatch()({
         type: 'activePictureMenu'
      });
   }

}

export default PictureController;