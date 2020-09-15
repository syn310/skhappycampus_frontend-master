class AuthService {

    /** 로그인 여부 체크 */
    isLogin = () => {
        return (this.getSessionObj() !== null? true : false);
    }

    /* session 정보 반환 */
    getSessionObj = () => {
        if(sessionStorage["sessionObj"]){
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);
            return sessionObj;
        }else{
            return null;
        }
    }

    /** 변수명이 달라서 로그인 이후 토큰 set은 따로 만들었음 */
    /** session정보 저장 (로그인 이후) */
    setSessionObj = (res) => {

        //console.log(":::::::: 세션정보===>", res)

        const data = {
            "token": res.newtoken,
            "userId": res.userid,
            "userType": res.usertype,
        };

        //sessionStorage에는 문자열만 저장 가능
        sessionStorage.setItem("sessionObj", JSON.stringify(data))



    }



    /** Token 반환 */
    getToken = () => {
        if(!sessionStorage) return null;

        if(!sessionStorage["sessionObj"]){
            return null;
        }
        try {
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);
            return sessionObj.token;
        } catch(e) {
            return null;
        }
    }


    /** session정보에서 userId 반환 */
    getUserInfo = () => {

        if(sessionStorage["sessionObj"]){
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);

            // console.log("getuserIfo", sessionObj)

            let userId = null ;
            if( sessionObj.token && sessionObj.userId ){
                userId = sessionObj.userId;
            }

            return userId;
        }
    }
    /** session obj 삭제 */
    removeSessionObj = () => {
        if(!sessionStorage) return null;

        if(sessionStorage["sessionObj"]) {
            sessionStorage.removeItem("sessionObj");
        }
    }

    /**. refresh 문제때문에 serial number도 session storage 활용 */
    setSerialNumber = (num) => {
        sessionStorage.setItem("serialNumber", num);
    }

    /**. refresh 문제때문에 serial number도 session storage 활용 */
    getSerialNumber = () => {
        if(!sessionStorage["serialNumber"]) {
           // window.location.href="recruit"
            return "null";
        }else{
            return sessionStorage.getItem("serialNumber");
        }
    }

     /**. refresh 문제때문에 serial number도 session storage 활용 */
     removeSerialNumber = () => {
        sessionStorage.removeItem("serialNumber");
    }
}

export default new AuthService()