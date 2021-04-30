<template>
  <div class="About pt-5">
    <div class="about-us-title text-center">
      <h1 class="pb-5">About Us</h1>
      <div class="div-p-1">
          We help in easy access for live online sessions
      </div>
    </div>
    <div class="d-flex pb-5">
      <div class="first-box">
        <h1 class="display-5">Our Story</h1>
        <p class="lead">
          We are students who have new point of view for online streaming.
          Since everyone started to depend more on online platforms, it can be hard for people who are not experienced much with online paltform to 
          go live online. As well as for gamers and studying rooms. Conferences also are much more dependant on online sessions.
          ElteLive purpose is for sharing ideas, stories,gaming, teaching, and speaking out loud.
        </p>
      </div>
      <div>
        <img class="our-story" src="/img/our-story.svg" alt="our-story-image">
      </div>
    </div>
    <div class="row pl-5 pr-5 pb-5">
      <div class="col-sm-6 pb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Share your voice</h5>
            <p class="card-text">
              We encourage sharing your voice through live streaming for your
              purpose and intentions
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 pb-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Better Online Conferences</h5>
            <p class="card-text"> 
              Conferences to be addressed to the maximum amount of people in the easiest and fastest way
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 pb-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Online Gaming Streams</h5>
            <p class="card-text">
              Want to stream your game while playing? Go ahead and invite your friends and fans to watch you live while gaming!
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 pb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Online Classes</h5>
            <p class="card-text">
              Online classes are fun on our application since we provide functionalities to provide the best sound quality and smooth classes
            </p>
          </div>
        </div>
      </div>
      <div class="last-card col-sm-10">
        <div class="card last-card-d">
          <div class="card-body">
            <h5 class="card-title">Low Resolution Support</h5>
            <p class="card-text">
              Our focus is being empathetic as well and we provide our stream to be working on lower resolutions for intrrupted internet connections and mobile data. You can attend the stream from your laptop or phone with bad internet connection and you'll still be able to listen and watch the stream.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-us d-flex justify-content-center pt-5 pb-5">
      <div class="contact-c">
        <div class="contact-preview">
          <h2>Reach the Team</h2>
        </div>
        <div class="contact-info">
          <h2>You can contact us since we like to communicate and socialize</h2>
          <router-link to="/contact" class="btn-contact">Contact Us</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
 export default{
  name:'about-us',
 }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
  .about-us-title {
    text-transform: uppercase;
  }
  .about-us-title > h1 {
    font-size: 3.2rem;
  }

  .our-story {
    width: 600px;
    height: 400px;
    margin-left: 7rem;
  }
  .div-p-1{
    font-size: 1.3rem;
    margin-bottom: 10rem;
  }

  .first-box {
    max-width: 700px;
    margin-left: 10rem;
    margin-bottom: 5rem;
  }

  .last-card {
    margin: 0 auto;
  }
  .card:hover {
    background-color: rgb(92,186,236);
    background-color: linear-gradient(90deg, rgba(92,186,236,1) 58%, rgba(5,123,254,1) 85%);
    color: white;
    transition: background-color 0.3s ease-out;
    font-size: 1.3rem;
  }

  .contact-card {
	  font-family: 'Muli', sans-serif;
	  display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
  }
  .contact-c {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    max-width: 100%;
    overflow: hidden;
    width: 700px;
  }

.contact-c h2 {
	letter-spacing: 1px;
	margin: 10px 0;
}

.contact-preview {
	background-color: #057bfe;
	color: #fff;
	padding: 30px;
	max-width: 250px;
}

.contact-info {
	padding: 30px;
	position: relative;
	width: 100%;
	
}

.btn-contact {
	background-color: #057bfe;
	border: 0;
	border-radius: 50px;
	color: #fff;
	font-size: 16px;
	padding: 12px 25px;
	letter-spacing: 1px;
	cursor: pointer;
	float: right;
}

  .btn-contact:hover {
    background: rgb(143, 190, 235);
    color: black;
  }
</style>
