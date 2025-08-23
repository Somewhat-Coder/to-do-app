import {
  extractTime,
  getDayOrdinal,
  getHeaderDateAndMonth,
} from "../../utils/functions/DateFormatting";
import dayjs from "dayjs";

// extractTime function
describe("extractTime", () => {
  test("should format timestamp into '23rd Aug 25, 02:00'", () => {
    expect(extractTime(1755910821000)).toBe("23rd Aug 25, 02:00");
  });

  test("should format another timestamp correctly (1st Jan 70, 01:00)", () => {
    expect(extractTime(0)).toBe("1st Jan 70, 01:00");
  });

  test("should handle timestamp for leap year date (29th Feb 24, 09:50)", () => {
    expect(extractTime(1709200200000)).toBe("29th Feb 24, 09:50");
  });

  test("should handle single-digit day correctly (5th May 21, 16:45)", () => {
    expect(extractTime(1620229500000)).toBe("5th May 21, 16:45");
  });

  test("should handle midnight timestamp (10th Oct 23, 01:00)", () => {
    expect(extractTime(1696896000000)).toBe("10th Oct 23, 01:00");
  });
});

// getDayOrdinalFunction
describe("getDayOrdinal", () => {
  test("should return the ordinal 'th'", () => {
    expect(getDayOrdinal("5")).toBe("th");
  });

  test("should return the ordinal 'st'", () => {
    expect(getDayOrdinal("31")).toBe("st");
  });

  test("should return the ordinal 'rd'", () => {
    expect(getDayOrdinal("3")).toBe("rd");
  });

  test("should return ''", () => {
    expect(getDayOrdinal("0")).toBe("");
  });
});

// getHeaderDateAndMonth
describe("getHeaderDateAndMonth", () => {
  test("should return the date 'Wednesday, 20th'", () => {
    expect(getHeaderDateAndMonth(dayjs("2025-08-20"), false)).toBe(
      "Wednesday, 20th"
    );
  });

  test("should return the date 'Monday, 19th'", () => {
    expect(getHeaderDateAndMonth(dayjs("2025-05-19"), false)).toBe("Monday, 19th");
  });

  test("should return the date month 'August'", () => {
    expect(getHeaderDateAndMonth(dayjs("2025-08-20"), true)).toBe("August");
  });

    test("should return the date month 'September'", () => {
      expect(getHeaderDateAndMonth(dayjs("2025-09-20"), true)).toBe("September");
    });
});
