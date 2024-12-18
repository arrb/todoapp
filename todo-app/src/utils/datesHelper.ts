import {differenceInDays, isPast, parseISO} from "date-fns";

export const calculateDaysInfo = (dueDate: string | null) => {
    if (!dueDate) return null;

    const parsedDate = parseISO(dueDate);
    const daysDifference = differenceInDays(new Date(), parsedDate);

    return isPast(parsedDate)
        ? { type: "overdue", days: daysDifference }
        : { type: "left", days: -daysDifference };
};