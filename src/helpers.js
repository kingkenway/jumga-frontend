export default{
    setImg: function (img, banner) {
        // if (img != null) return process.env.VUE_APP_BASE_URL + img
        if (img != null) return img
        else if (banner == "product") return require("@/assets/flower.png")
        else if (banner) return require("@/assets/banner.png")
        return require("@/assets/blank.png")
    },

    checkDescription: function (val) {
        if (val) return val
        return "No description set."
    },

    fmtNumber: function (item) {
        return item.toLocaleString()
    },

    reformat: function (item) {
        return typeof(item) == 'undefined' ? '' : item
    },

    isObjectEmpty: function(obj) {
        alert(12)
        for(const prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
            }
        }
        
        return JSON.stringify(obj) === JSON.stringify({});
    }
}
