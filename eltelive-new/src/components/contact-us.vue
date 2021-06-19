<template>
  <div>
    <div class="text-center pt-5">
      <h1 class="pb-4">Contact Us</h1>
    </div>
    <div class="contact">
      <div class="d-flex justify-content-center mt-5 pb-5">
      <div class="jumbotron text-white text-center bg-primary w-50 p-4 mb-2">
          <p class="h4  font-weight-bold">LET'S TALK</p>
          WANT TO SPEAK TO US? WE ARE HAPPY TO BE IN CONTACT!
      </div>
    </div>
        <div class="right-side pl-3 pt-5">
          <div>
            <div class="right-side-p">
              <div>
                <img src="/img/location-graphic.svg" alt="" />
                Location : ELTE Faculty of Informatics, 1117 Budapest, Pázmány
                P. stny. 1/C
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
</template>

<script>
import Sending from "./sending-message";

export default {
  name: "contact-us",
  components: {
    Sending
  }
};
</script>

<style lang="scss">
$color: rgb(53, 114, 210);

.contact {
  margin: 0 10rem;
  background-color: #f1f3f5;
  box-shadow: 0 10px 30px 0px rgba(155, 207, 241, 0.1);
  padding: 50px;
}
.title {
  color: $color;
}
.email-icon {
  width: 20px;
  height: 20px;
}

.side-text-left-p {
  font-size: 1.3rem;
}
.right-side-p {
  color: rgb(128, 125, 125);
  font-size: 1rem;
  font-weight: bold;
}

@media screen and (max-width: 500px){
 
}
</style>
