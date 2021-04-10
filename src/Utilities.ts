module.exports = {
    parseDate(date: string | number | Date) {
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