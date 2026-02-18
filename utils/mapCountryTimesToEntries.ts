import countryTimes from "@/data/countryTimes.json";
import { Entry } from "@/types/Entry";

export function mapCountryTimesToEntries(): Entry[] {
    return Object.entries(countryTimes).map(([, data]) => {
        const deviation = Number(data.deviation);

        let deviationStr = "0";
        if (deviation > 0) {
            deviationStr = deviation < 10 ? `+0${deviation}` : `+${deviation}`;
        } else if (deviation < 0) {
            deviationStr = deviation > -10 ? `-0${Math.abs(deviation)}` : `${deviation}`;
        }

        return {
            label: data.name,
            value: deviationStr,
            icon: data.flag,
        };
    });
}
