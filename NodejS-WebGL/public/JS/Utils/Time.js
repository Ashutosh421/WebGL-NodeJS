'use strict'

var Time =
    {   
        deltaTime: 0,
        deltaTimeInMilliseconds: 0,
        time: 0,

        temp: (performance.now() / 1000),

        update : ()=>
        {
            this.temp = (performance.now() / 1000);
            this.deltaTime = this.temp - this.time;
            this.time = (performance.now() / 1000);

            //console.log(`Delta Time ` + this.deltaTime);
        },

        getDeltaTime : () =>
        {
            return this.deltaTime;
        },

        getCurrentTime: () =>
        {
            return this.time;
        }
    }