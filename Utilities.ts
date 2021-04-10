module.exports = {
    secondsToString(seconds) {
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var seconds = Math.floor(seconds % 60);

        var str = "";

        if (days > 0) {
            str += days + ":";
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        str += `${days}:${hours}:${minutes}:${seconds}`

        return str;
    },
    parseDate(date) {
        var d = new Date(date)
        var hours = d.getHours().toString()
        hours = hours.length > 1 ? hours : '0' + hours
        var minutes = d.getMinutes().toString()
        minutes = minutes.length > 1 ? minutes : '0' + minutes
        var seconds = d.getSeconds().toString()
        seconds = seconds.length > 1 ? seconds : '0' + seconds
      
        return hours + ':' + minutes + ':' + seconds
      }
}