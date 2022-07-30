// eslint-disable-next-line no-extend-native
String.prototype.pick = function(min, max) {
  var n, chars = '';

  if (typeof max === 'undefined') {
      n = min;
  } else {
    /* this line was creating random number which then add to min and creates a unique 'n'
      as requirement is 12 characters password every time. So, i commented below logic.
      */
     // n = min + Math.floor(Math.random() * (max - min + 1));
     n = min + max;
  }

  for (var i = 0; i < n; i++) {
      chars += this.charAt(Math.floor(Math.random() * this.length));
  }
  return chars;
};


// Credit to @Christoph: http://stackoverflow.com/a/962890/464744
// eslint-disable-next-line no-extend-native
String.prototype.shuffle = function() {
  debugger;
  var array = this.split('');
  var tmp, current, top = array.length;

  if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
  }

  return array.join('');
};

var specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
var lowercase = 'abcdefghijklmnopqrstuvwxyz';
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var numbers = '0123456789';

var all = specials + lowercase + uppercase + numbers;

var password = '';
password += specials.pick(1);
password += lowercase.pick(1);
password += uppercase.pick(1);
password += numbers.pick(1);
password += all.pick(3, 5);

export {password as generatedPassword}