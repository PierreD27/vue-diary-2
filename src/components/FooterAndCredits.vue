
<template>
    <div class="footer-wrapper">
        <div class="credits">

            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></a>
            <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
        </div>

        <p id="rights">SNS Weather Channel<sup>©</sup> 2024 All rights resereved</p>
    </div>
</template>

<style lang="scss" scoped>
    .footer-wrapper{
        display: flex;
        align-items: center;
        background-color: #1e4258;
        margin-top: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        justify-content:center;
        padding-left: 1rem;
        gap: 1rem;
        border-radius: 0.5rem 0.5rem 0  0;

        #rights{
            text-align: right;
            margin-right: 1rem;
        }

        .credits{
            display: flex;
            align-items: center;
            gap: 0.5rem;

            img{
                height: 2rem;
            }
        }
    }




</style>