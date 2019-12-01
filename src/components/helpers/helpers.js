import moment from 'moment';

function formatNumber(num, type) {
    let numsplit, int, dec;

    num = Math.abs(num); // removes the sign of number
    num = num.toFixed(2); // 10.4567 -> 10.46
    numsplit = num.split('.'); //will split the number to 2 when it encounter '.

    int = numsplit[0]; //for number

    if(num > 0 ) {
        if(int.length > 3) {
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3); //51000->51,000
        } 
    }
    
    dec = numsplit[1]; //for decimal
    
    return ((type === 'exp') ? '-' : '+')+int + '.' + dec;

        
 }

 function formatBalance(num) {
    let numsplit, int, dec, results;

    num = num.toFixed(2); 

    numsplit = num.split('.')

    int = numsplit[0]; //for number

    if(num>0) {
        if(int.length > 3) {
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3); //51000->51,000
        }
    }else {
        if(int.length > 4) {
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3);
        }
    } 

    dec = numsplit[1]; //for decimal
    
    if (num > 0 ) {
        results = '+'+int + '.' + dec;
        return results;
    } if(num < 0) {
        results = int + '.' + dec;
        return results;
    } else {
        results = '+' + int + '.' + dec
        return results;
    }

 }

 function formatPercentage(perc) {
    //  console.log(`before perc: ${perc}`)
     if(perc === undefined ) {
         return '---'
     }

     if(perc === 0 ){
         return '---'
     }
    return (perc)+((perc > 0) ? '%':'---');
}

function formatDate(mnt) {
    let mm = moment(mnt).format('MM');
    let yy = moment(mnt).format('YYYY');
    let res = `${mm}+${yy}`
    return res
}

function formatDateDisplay(mnt) {
    let dt = moment(mnt).format('MMM DD, YYYY');
    return dt
}

 export default {
     formatNumber,
     formatPercentage,
     formatDate,
     formatDateDisplay,
     formatBalance
 };