import moment from 'moment';

function formatNumber(num, type) {
    let numsplit, int, dec;

    num = Math.abs(num); // removes the sign of number
    num = num.toFixed(2); // 10.4567 -> 10.46

    numsplit = num.split('.'); //will split the number to 2 when it encounter '.

    int = numsplit[0]; //for number

    if(int.length > 3) {
        int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3); //51000->51,000
    }

    dec = numsplit[1]; //for decimal
    
    return (type === 'exp' ? '-':'+') + ' ' + int + '.' + dec;
 }

 function formatPercentage(perc) {
    if(perc>=0){
        return (perc)+(perc > 0 ? '%':'---');
    }else{
        perc = ''
    }
}

function formatDate(mnt) {
    let mm = moment(mnt).format('MM');
    let yy = moment(mnt).format('YYYY');
    let res = `${mm}+${yy}`
    return res
}

 export default {
     formatNumber,
     formatPercentage,
     formatDate
 };