class UrlController{
    constructor(urlString){
        this.urlString = urlString;
    }
    getUrlParameters() {
        if (this.urlString.indexOf("?") > -1) {
            let paramString = this.urlString.split("?")[1];
            let paramObject = new URLSearchParams(paramString);
            return paramObject;
        } else {
            return false;
        }
    }
}

export default UrlController;