
class Header {
  
    responseHeaders() {
        let token = JSON.parse(localStorage.getItem("accessToken"));
        if (token) {
            let header = {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded; multipart/form-data; application/json; charset=UTF-8",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token}`
            };
            return header;
        } else {
            return {};
        }
    }
  };
  
  export default new Header();