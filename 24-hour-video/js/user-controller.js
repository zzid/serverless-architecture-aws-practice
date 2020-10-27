var userController = {
  data : {
    auth0Lock: null,
    config: null,
  },
  uiElements: {
    loginBtn: null,
    logoutBtn: null,
    profileBtn: null,
    profileNameLabel: null,
    profileImage: null
  },
  init: function (config) {
    var that = this;

    this.uiElements.loginBtn = $('#auth0-login')
    this.uiElements.logoutBtn = $('#auth0-logout')
    this.uiElements.profileBtn = $('#user-profile')
    this.uiElements.profileNameLabel = $('#profilename')
    this.uiElements.profileImage = $('#profilepicture')
    this.data.config = config;
    this.data.auth0Lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain);

    var idToken = localStorage.getItem('userToken');
    if(idToken) {
      this.configreAuthenticatedRequests();
      this.data.auth0Lock.getProfile(idToken, (err,profile)=>{
        if(err){
          return alert("프로필 가져오기 실패" + err.message);
        }
        that.showUserAuthenticationDetails(profile);
      })
    }
    this.wireEvents();
  },
  configreAuthenticatedRequests: function(){
    $.ajaxSetup({
      'beforeSend' : (xhr) => {
        xhr.setRequestsHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
      }
    })
  },
  showUserAuthenticationDetails: function(profile) {
    var showUserAuthenticationElements = !!profile;
    if(showUserAuthenticationElements) {
      this.uiElements.profileNameLabel.text(profile.nickname);
      this.uiElements.profileImage.attr("src", profile.picture);
      console.log(profile.picture)
    }
    this.uiElements.loginBtn.toggle(!showUserAuthenticationElements);
    this.uiElements.logoutBtn.toggle(showUserAuthenticationElements);
    this.uiElements.profileBtn.toggle(showUserAuthenticationElements);
  },
  wireEvents: function(){
    var that = this;

    this.data.auth0Lock.on('authenticated', (authResult)=>{
      that.data.auth0Lock.getUserInfo(authResult.accessToken, (error,profile)=>{
        if(!error) {
          localStorage.setItem('userToken', authResult.accessToken);
          that.configreAuthenticatedRequests();
          that.showUserAuthenticationDetails(profile);
        }
      })
    })
    this.uiElements.loginBtn.click(()=>that.data.auth0Lock.show())

    this.uiElements.logoutBtn.click(()=>{
      localStorage.removeItem('userToken');
      that.uiElements.logoutBtn.hide();
      that.uiElements.profileBtn.hide();
      that.uiElements.loginBtn.show();
    })
  }
}
