<template>
<form class="needs-validation" novalidate>
     <section class="contact">
         <h1 class="title"> CONTACT US</h1>
         <div class="container">
             <div class="contact-form row">
                 <div class="form-field col-lg-6">
                     <input id="first-name" class="input-text" type="text" name="" required>
                     <label for="validationName" class="label">First Name</label>
                     <div class="invalid-feedback">
                        Please provide your First Name.
                    </div>
                 </div>
                 <div class="form-field col-lg-6">
                     <input id="last-name" class="input-text" type="text" name="" required>
                     <label for="validationName" class="label">Last Name</label>
                    <div class="invalid-feedback">
                        Please provide your Last Name.
                    </div>
                 </div>
                 <div class="form-field col-lg-6">
                     <input id="email" class="input-text" type="email" name="" required>
                     <label for="validationEmail" class="label">Email</label>
                     <div class="valid-feedback">
                         Looks good!
                     </div>
                 </div>
                 <div class="form-field col-lg-6">
                     <input id="company" class="input-text" type="text" name="">
                     <label for="validationCompany" class="label">Company</label>
                 </div>
                 <div class="form-field col-lg-12">
                     <input id="message" b class="input-text" type="text" name="" required>
                     <label for="message" class="label">Message</label>
                 </div>
                 <div class="form-field col-lg-12">
                     <button class="btn btn-primary btn-lg">Submit</button>
                 </div>
             </div>
         </div>
     </section>
    </form>
</template>


<script>
    export default {
        name :'Contact'
    }
</script>

<style lang="scss">
$color : #2C5E82;
.contact{
    max-width: 800px;
    margin : 50px auto;
    position:relative;
    box-shadow: 0 10px 30px 0px rgba(0,0,0,0.1);
    padding: 30px;
}

.contact .title{
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3px;
    font-size: 3em;
    line-height: 48px;
    padding-bottom: 20px;
    color: #28BAEE;
    background: linear-gradient(to right, #2C5E82 0%,#28BAEE 100%);
    background-clip:text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.contact-form .form-field{
    position:relative;
    margin: 32px 0;
    color: $color;
}

.contact-form .input-text{
    display: block;
    width: 100%;
    height: 36px;
    border-width: 0 0 2px 0;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    
}
.contact-form .input-text:focus + .label,
.contact-form .input-text.not-empty + .label{
    transform: translateY(-24px);
}
.contact-form .input-text:focus{
    outline:none;    
}

.contact-form .label{
    position:absolute;
    left: 20px;
    bottom: 11px;
    font-size:18px;
    line-height: 26px;
    font-weight: 400;
    color: $color;
    cursor:text;
    transition: transform 0.2s ease-in-out;
}

.contact-form .input-text:focus{
    outline:none;    
}

.contact-form .label{
    position:absolute;
    left: 20px;
    bottom: 11px;
    font-size:18px;
    line-height: 26px;
    font-weight: 400;
    color: $color;
    cursor:text;
    transition: transform 0.2s ease-in-out;
}
</style>