class UrlController{
    constructor(urlString){
        this.urlString = urlString;
    }
    getUrlParameters() {
        if (this.urlString.indexOf("?") > -1) {
            console.log ("Index is true");
            let paramString = this.urlString.split("?")[1];
            let paramObject = new URLSearchParams(paramString);
            return paramObject;
        } else {
            console.log("no parameter");
            return false;
        }
    }
}

export default UrlController;