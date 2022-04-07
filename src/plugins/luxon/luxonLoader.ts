// import * as luxon from 'luxon'
// import * as d from 'luxon'
import { App } from 'vue';
import {
    // VERSION,
    DateTime,
    Duration,
    Interval,
    Info,
    Zone,
    FixedOffsetZone,
    IANAZone,
    InvalidZone,
    SystemZone,
    Settings,
} from 'luxon'

type TLuxon = {
    DateTime: typeof DateTime,
    Duration: typeof Duration,
    Interval: typeof Interval,
    Info: typeof Info,
    Zone: typeof Zone,
    FixedOffsetZone: typeof FixedOffsetZone,
    IANAZone: typeof IANAZone,
    InvalidZone: typeof InvalidZone,
    SystemZone: typeof SystemZone,
    Settings: typeof Settings
} 

const luxon: TLuxon = {
    // VERSION,
    DateTime,
    Duration,
    Interval,
    Info,
    Zone,
    FixedOffsetZone,
    IANAZone,
    InvalidZone,
    SystemZone,
    Settings,
}

export default{
    install:(app: App) => {
        function load(): TLuxon{
            return luxon
        }
        app.config.globalProperties.$lx = load();
    }    
};

declare module "@vue/runtime-core" {
    //Bind to `this` keyword
    interface ComponentCustomProperties {
      $lx: TLuxon;
    }
}


  
// export default{
//     install:(app: App) => {
//         function load(): typeof DateTime{
//             return DateTime;
//         }
//         app.config.globalProperties.$luxon = load();        
//     }
// }
// declare module "@vue/runtime-core" {
//     //Bind to `this` keyword
//     interface ComponentCustomProperties {
//       $luxon: DateTime;
//     }
// }


// export function loadLuxon(){
//     return DateTime 
// }

// declare module "@vue/runtime-core" {
//     //Bind to `this` keyword
//     interface ComponentCustomProperties {
//       $luxon: DateTime;
//     }
// }


// import VueLuxon from "vue-luxon";
// import { App } from 'vue';

// export default{
//     install:(app: App) => {
//         function load(): VueLuxon{
//             //return VueLuxon;
//             VueLuxon.install
//             console.log(VueLuxon)
//             return VueLuxon.vueluxon;
//         }
//         app.config.globalProperties.$luxon = load();        
//     }
// }
// declare module "@vue/runtime-core" {
//     //Bind to `this` keyword
//     interface ComponentCustomProperties {
//       $luxon: VueLuxon;
//     }
// }