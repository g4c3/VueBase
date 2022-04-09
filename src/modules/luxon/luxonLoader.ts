import { App } from 'vue';
import {
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
    DateTime,
    Duration,
    Interval,
    Info,
    Zone,
    FixedOffsetZone,
    IANAZone,
    InvalidZone,
    SystemZone,
    Settings
}

export default{
    install:(app: App) => {
        function load(): TLuxon{
            return luxon
        }
        app.config.globalProperties.$luxon = load();
    }    
};

declare module "@vue/runtime-core" {
    //Bind to `this` keyword
    interface ComponentCustomProperties {
      $luxon: TLuxon;
    }
}
