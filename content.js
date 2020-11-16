(function() {

  function formatToLocalDateTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = year + '.' + month + '.' + day + '  ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // Table cells that contain only a date.
  for(cell of document.getElementsByTagName('td')) {
    const currentText = cell.textContent;
    try {
      const date = Date.parse(currentText);
      if (date != NaN && date > 0) {
        const dateObj = new Date(date);
        cell.textContent = formatToLocalDateTime(dateObj);
      }
    } catch {
      // it's ok.
    }
  }

  // Portainer Logs
  for(cell of document.getElementsByTagName('p')) {
    const currentText = cell.textContent;
    try {
      const words = currentText.split(' - ');
      const firstWord = words[0].replace(/[\n\r]/g, ''); // Remove carriage returns.
      if (!firstWord.startsWith('20')) {
        return;
      }

      const date = Date.parse(firstWord);
      if (date != NaN && date > 0) {
        const dateObj = new Date(date);
        cell.textContent = formatToLocalDateTime(dateObj) + ' - ' + words[1];
      }
    } catch {
      // it's ok.
    }
  }

})();
