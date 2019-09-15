<template>
    <div class="container" style="margin: 100px auto">
        <div class="columns" v-if="$root.currentUser">
            <div class="column is-12">
                <div class="wrapper">
                    <div class="header">
                        <router-link :to="{name: 'dashboard'}" title="Dashboard">
                            <i class="fa fa-bars"></i>
                        </router-link>
                        <router-link :to="{name: 'edit-profile'}" title="Edit Profile">
                            <i class="fa fa-cog"></i>
                        </router-link>
                    </div>
                    <div class="middle">
                        <img :src="'data:image/png;base64,' + ($root.currentUser.images && $root.currentUser.images.length) ? $root.currentUser.images[0].image : null" alt="" class="user-pic" />
                        <h4 class="name">{{ $root.currentUser.name }}</h4>
                        <h4 class="work">{{ $root.currentUser.email }}</h4>
                        <h4 class="social">{{$root.currentUser.phone}}</h4>
                    </div>
                    <div class="footer">
                        <button class="btn-follow">Address </button><br/>
                        <!-- <i class="fa fa-lock"></i> -->

                        <!-- <br/> -->
                        <!-- <h4 class="profile-status">This profile is hidden</h4> -->
                        <div class="content" v-if="$root.currentUser.address && $root.currentUser.address.length">
                            <div class="container" v-for="address in $root.currentUser.address" :key="address.id">
                                <p>{{ address.address }}</p>
                                <p><b>{{ address.state }}</b> - <b>{{ address.country }}</b>
                                </p>
                                <hr>
                            </div>
                        </div>
                        <h4 v-else class="profile-status">No Address was found!</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/*
body {
  background: url(https://newevolutiondesigns.com/images/freebies/city-wallpaper-18.jpg);
  background-size: cover;
  font-family: verdana;
} */

.container {
    height: 110%;
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: hidden;
    max-width: fit-content;
}

.bg-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: var(--app-color);
  z-index: -1 ;
}

.wrapper {
  width: 400px;
  height: 500px;
  background-color: #f9690E;
  margin: 50px auto;
  border-radius: 12px;
  overflow: hidden;
  z-index: 999;
}

.header i{
  font-size: 20px;
  color: rgba(255,255,255,0.7);
  padding: 10px;
  margin-top:20px;
}

.fa-bars{
  float: left;
  margin-left:20px;
}

.fa-bars:hover{
  cursor: pointer;
  animation: bars 0.3s ease-in forwards;
}

.fa-cog{
  float: right;
  margin-right:20px;
}

.fa-cog:hover{
  cursor: pointer;
  animation: rotate 1s ease-in infinite;
}

div.middle{
  position:relative;
  text-align: center;
  top: 70px;
}

img.user-pic{
  width:110px;
  height: 110px;
  border-radius: 100%;
  background: rgba(255,255,255,0.7);
  border: 5px solid rgba(255,255,255,1);
}

h4.name{
  font-size: 18px;
  color: rgba(255,255,255,0.8);
  padding: 10px;
}

h4.work{
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  padding: 10px;
  padding-top: 0px;
}

h4.social{
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  padding: 15px;
}

div.footer{
  position: relative;
  background: rgba(255,255,255,1);
  top:110px;
  height:180px;
  text-align: center;
}

.btn-follow
{
  position: relative;
  padding: 15px 70px;
  top: -22px;
  background: rgba(255,255,255,1);
  border: none;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f9690E;
  box-shadow: 0px 5px 45px rgba(249,105,14,0.4);
  border: 1px solid transparent;
  transition: all 0.5s ease-in;
}

.btn-follow:hover
{
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.2);
  background: #f9690E;
  color: rgba(255,255,255,1);
}

.fa-lock{
  font-size: 20px;
  color: rgba(0,0,0,0.2);
  padding-top:15px;
}

.profile-status{
  font-size: 12px;
  color: rgba(0,0,0,0.2);
  padding-top: 7px;
}

@keyframes rotate{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(180deg);
  }
}

@keyframes bars{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(90deg);
  }
}

@keyframes img3d{
  0%{
    transform: rotateY(0deg);
  }
  100%{
    transform: rotateY(55deg);
  }
}

@media only screen and (max-width: 600px) {
    .wrapper {
        width: 100%;
        margin: 0 auto;
    }
}


  /* transform-origin: left top;
 animation: swing 2s ease-in forwards;
}


@-moz-keyframes swing {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
@-webkit-keyframes swing {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
@keyframes swing {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
*/
</style>
