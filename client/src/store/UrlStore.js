import { makeAutoObservable, observable } from "mobx";

export default class UrlStore {
    constructor(){
        this._isAuth = false
        this._isAdmin = false
        //this._isAuth = true
        //this._isAdmin = true
        this._user = {}
        makeAutoObservable(this);
    }
    constructor() {
        makeAutoObservable(this);
      }
    
      init = () => {
        this.fetchUrlsForUser();
      };
    
      //Fetch urls for users
      fetchUrlsForUser = async () => {
        try {
          this.urlDataLoading = true;
    
          const data = await getUrlsForUser();
          this.setUrlData(data);
          this.urlDataLoading = false;
        } catch (error) {
          console.log(error);
        }
      };
    
      //create new url
      createNewUrl = async () => {
        try {
          if (!this.newUrlPayload.originalLink) {
            alert("Original link is required");
            return;
          }
          await createUrl(this.newUrlPayload);
          this.fetchUrlsForUser();
          this.showUrlAddView = false;
        } catch (error) {}
      };
    
      //delete url
      deleteUrl = async (urlCode) => {
        await deleteUrlByUrlCode(urlCode);
        this.fetchUrlsForUser();
        snackBarStore.showSnackBar("Deleted Successfully", "success");
      };
    
      setUrlData = (data) => (this.urlData = data);
    
      setShowUrlAddView = (val) => (this.showUrlAddView = val);
    }
    
    const urlStore = new UrlStore();
