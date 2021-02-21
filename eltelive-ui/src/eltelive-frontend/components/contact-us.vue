<template>
    <div class="contact">
        <div class="container" >
             <h1 class="title text-left">CONTACT US</h1>
             <div class="row">
             <div class="side-text-left  border-right">
                    <div class="side-text-left-p"> 
                        <h1>LET'S TALK</h1>
                        <p>WANT TO SPEAK TO US? WE ARE HAPPY TO BE IN CONTACT!</p>
                    </div>
            </div>
            <div class="right-side">
                <div class="col">
                      <div class="right-side-p">
                          <div>
                              <img src="/img/location-graphic.svg" alt="">
                              Location : ELTE Faculty of Informatics, 1117 Budapest, Pázmány P. sny. 1/C
                            </div>
                          <div>
                                <img src="/img/phone-graphic.svg" alt="">
                                TelePhone: ELTELive Team
                            </div>
                          <div>
                                <img class="email-icon" src="/img/email-graphic.svg" alt="">
                                Email : SomeEmail@someemail.com
                            </div>
                    </div>  
                <div class="contact-graphic col">
                     <img src="/img/contact-graphic.svg" alt="">
                </div>
                </div>
             </div>       
            </div>
         </div>
     </div>
</template>

<script>
    export default {
        name :'contact-us'
    }
</script>

<style lang="scss">
$color:#438bac;
.contact{
    max-width: 70%;
    max-height: 70%;
    margin : 50px auto;
    background-color:#f1f3f5;
    box-shadow: 0 10px 30px 0px rgba(155, 207, 241, 0.1);
    padding: 30px;
}

.title{
    color: $color;
}
.email-icon{
    width:20px;
    height:20px;
}

.side-text-left{
    padding-top:30%;
    padding-bottom:5%;
    width: 40%;
    text-align: left;
}
.side-text-left-p{
    color: $color;
    font-size: 30px;
}
.right-side{
    width: 50%;
    text-align: left;
    padding-top:10%;
}
.right-side-p{
    color: rgb(128, 125, 125);
    font-size: 15px;
    font-weight: bold;
}
</style>
