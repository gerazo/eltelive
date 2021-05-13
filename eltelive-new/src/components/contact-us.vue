<template>
  <div>
     <div class="contact-us-title text-center pt-5">
      <h1 class="pb-5">Contact Us</h1>
    </div>
  <div class="contact">
    <div class="content d-flex">
      <div class="side-text-left border-right">
        <div class="side-text-left-p">
          <h2 class="display-4">LET'S TALK</h2>
          <p>WANT TO SPEAK TO US? WE ARE HAPPY TO BE IN CONTACT!</p>
        </div>
      </div>
      <div class="right-side pl-3">
        <div>
          <div class="right-side-p">
            <div>
              <img src="/img/location-graphic.svg" alt="" />
              Location : ELTE Faculty of Informatics, 1117 Budapest, Pázmány P.
              stny. 1/C
            </div>
            <div>
              <img src="/img/phone-graphic.svg" alt="" />
              TelePhone: ELTELive Team
            </div>
            <Sending></Sending>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Sending from './sending-message';

export default {
  name: "contact-us",
  components: {
    Sending
  }
};
</script>

<style lang="scss">
  .contact-us-title {
    text-transform: uppercase;
  }
  .contact-us-title > h1 {
    font-size: 3.2rem;
  }
$color: rgb(53, 114, 210);
.contact {
  margin: 3rem 10rem;
  background-color: #f1f3f5;
  box-shadow: 0 10px 30px 0px rgba(155, 207, 241, 0.1);
  padding: 30px;
}
.title {
  color: $color;
}
.email-icon {
  width: 20px;
  height: 20px;
}
.contact-graphic {
  margin: 10px;
  height: auto;
  overflow: auto;
}
.side-text-left {
  padding-top: 15rem;
  width: 23rem;
}
.side-text-left-p {
  color: $color;
  font-size: 1.8rem;
}
.right-side-p {
  color: rgb(128, 125, 125);
  font-size: 1rem;
  font-weight: bold;
}
.image {
  height: auto;
  max-width: 500px;
}
</style>
