import { format, startOfISOWeek, endOfISOWeek, isSameMonth, getISOWeek } from "date-fns"
import nbLocale from 'date-fns/locale/nb'

export class DateUtil {
    public static getISODate(date: Date): string {
        // ISO 8601
        return format(date, 'YYYY-MM-DD')
    }

    public static getWeekNumber(date: Date): number {
        return getISOWeek(date)
    }

    public static getLocalizedDayName(date: Date): string {
        return format(date, 'dddd', { locale: nbLocale }).toLocaleUpperCase()
    }

    public static getWeekStartUntilWeekEnd(date: Date): string {
        const startOfWeek = startOfISOWeek(date)
        const startOfWeekDay = format(startOfWeek, 'D')
        const endOfWeek = endOfISOWeek(date)
        const endOfWeekDay = format(endOfWeek, 'D')
        const month = format(date, 'MMMM', { locale: nbLocale })
        const monthName = `${month.charAt(0).toUpperCase()}${month.substring(1)}`

        if (isSameMonth(startOfWeek, endOfWeek)) {
            return `${startOfWeekDay}-${endOfWeekDay} ${monthName}`
        }

        const nextMonth = format(endOfWeek, 'MMMM', { locale: nbLocale })
        const nextMonthName = `${nextMonth.charAt(0).toUpperCase()}${nextMonth.substring(1)}`

        return `${startOfWeekDay} ${monthName} - ${endOfWeekDay} ${nextMonthName}`
    }
}