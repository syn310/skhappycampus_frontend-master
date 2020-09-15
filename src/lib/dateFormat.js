export const dateFormat = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join("");
    }
// export default formatDate;

export const dateBarFormat = (date) => {

    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return date.length > 0 ? year + "-" + month + "-" + day : "";

}

/** Convert String Date to bar format String */
export const dateTypeBarFormat = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + "-" + month + "-" + day;
}