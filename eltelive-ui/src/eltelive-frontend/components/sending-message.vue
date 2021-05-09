<template>
  <div>
    <h5 class="mt-5">Send a Message:</h5>
    <div class="container mt-3">
      <form class="contact-form" v-on:submit.prevent="sendEmail">
        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" required />
        <label>Email</label>
        <input type="email" name="email" placeholder="Your Email" required />
        <label>Message</label>
        <textarea
          name="message"
          cols="30"
          rows="5"
          placeholder="Message"
          required
        >
        </textarea>
        <input class="font-weight-bold" type="submit" value="Send" />
      </form>
    </div>
    <button
      id="notificationSuccess"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
     Email Sent Successfully
    </button>
    <button
      id="notificationError"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
    </button>
    <script
      type="application/javascript"
      defer
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
export default {
  name: "Sending",
  data() {
    return {
      name: "",
      email: "",
      message: ""
    };
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('service_k3wro66', 'template_lm8nnls', e.target,
        'user_UnWtOOGPoa3vHSWQRtLZQ', {
          name: this.name,
          email: this.email,
          message: this.message
          }
        );
        setTimeout(function() {
          document.getElementById("notificationSuccess").style.display = "block";
        setTimeout(function() {
          $("#notificationSuccess").fadeOut("fast");
        }, 4000);
          document.location.reload();
        }, 5000);
      } catch (error) {
        document.getElementById("notificationError").style.display = error;
        setTimeout(function() {
          $("#notificationError").fadeOut("fast");
        }, 4000);
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #cbd8df;
  padding: 20px;
  width: 90%;
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: rgb(53, 114, 210);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: rgb(23, 91, 122);
}
.notification {
  text-align: center;
  position: fixed;
  top: 7rem;
  left: 40%;
  z-index: 999;
  height: 60px;
  width: 20%;
}

  #notificationSuccess {
    background-color: #75d812;
    font-size: 1.1rem;
  }
  #notificationError {
    background-color: rgb(245, 132, 132);
    font-size: 1.5rem;
  }
</style>
