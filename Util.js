import 'intl';
import 'intl/locale-data/jsonp/en';

export const dateToString = (date) => {
    const fmt = new Intl.NumberFormat('en-EN', { minimumIntegerDigits: 2 });
    return (String(date.getFullYear()) + "-" + fmt.format((date.getMonth() + 1)) + "-" + fmt.format(date.getDate()));
}
