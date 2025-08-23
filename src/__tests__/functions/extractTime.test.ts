import { extractTime } from "../../utils/functions/DateFormatting"


test(('extract time correctly'), () => {
    expect((extractTime(1755910821000))).toBe("23rd Aug 25, 02:00")
})