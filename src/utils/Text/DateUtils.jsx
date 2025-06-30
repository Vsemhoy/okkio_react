    // const getDayOfWeek(date) {
    //     const dayOfWeek = new Date(date).getUTCDay();   
    //     return isNaN(dayOfWeek) ? null : 
    //       ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    //   }

    //   const getMonthName(date) {
    //     let month = new Date(date).getMonth();   
    //     //console.log(month, date); 
    //     return isNaN(month) ? null : 
    //     ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
    //   }

    export const getMonthColor = (num, theme = 'light') => {
      // num--;
      const monthColors = [
        '#e1a7ed', // January 
        '#a7b1ed', // February
        '#a7cbed', // March
        '#a7e8ed', // April 
        '#9bf1d8', // May 
        '#99ebb5', // June 
        '#c3eda7', // July 
        '#eaf1a2', // August
        '#ede6a7', // September
        '#edd0a7', // October
        '#edb6a7', // November
        '#eda7bf', // December
      ];
      return monthColors[num];
    }