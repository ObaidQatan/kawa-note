/*
Availaible chars for a string input sample:
[aA-zZ] , [0 - 9] , { (  )  !  @  #  $  %  &  *  =  .  , space newLine }
 */
exports.encode = function encode(str){
    let pattern="".split();
    let patternCounter=0;

    for(let counter=0; counter < str.length; counter++){
        if(/[A-Z]/.test(str[counter])){
            //capital letter detected
            pattern[patternCounter]='^'; // push ^ at the same position of counter
            patternCounter++; // to the next position of pattern
            pattern[patternCounter] = convertLetterToDigit_A_J(str[counter]); // convert current letter to equivalent digit
            patternCounter++; // to the next position of pattern
        }else if(/[a-z]/.test(str[counter])){
            //small letter detected
            pattern[patternCounter] = convertLetterToDigit_A_J(str[counter]); // convert current letter to equivalent digit
            patternCounter++; // to the next position of pattern
        }else if(/[0-9]/.test(str[counter])){
            // digit detected
            pattern[patternCounter] = convertDigitToLetter(str[counter]); // convert current digit to equivalent letter
            patternCounter++; // to the next position of pattern
        }else if(/\(|\)|\!|\&|\#|\%|\*|=|@|\$/.test(str[counter])){
            // special char detected
            pattern[patternCounter] = convertSpecialCharToDigit(str[counter]);// convert current char to equivalent digit
            patternCounter++; // to the next position of pattern
        }
        else if(str[counter]===' '){
            pattern[patternCounter] = 'A';
            patternCounter++;
        }else if(str[counter]==='\n'){
            pattern[patternCounter] = 'Z';
            patternCounter++;
        }else if(str[counter]===','){
            pattern[patternCounter] = 'I';
            patternCounter++;
        }else if(str[counter]==='.'){
            pattern[patternCounter] = 'E';
            patternCounter++;
        }else{
            // prevented char 
            return null; // reject string;
        }
    }
    return pattern.join('');
}

function convertLetterToDigit_A_J(letter){
    // [a - j] <-> [0 - 9]
    if(/a|A/.test(letter)){
        return '0';
    }else if(/b|B/.test(letter)){
        return '1';
    }else if(/c|C/.test(letter)){
        return '2';
    }else if(/d|D/.test(letter)){
        return '3';
    }else if(/e|E/.test(letter)){
        return '4';
    }else if(/f|F/.test(letter)){
        return '5';
    }else if(/g|G/.test(letter)){
        return '6';
    }else if(/h|H/.test(letter)){
        return '7';
    }else if(/i|I/.test(letter)){
        return '8';
    }else if(/j|J/.test(letter)){
        return '9';
    }else{
        // [k - t] <-> [+0 - +9]
        return convertLetterToDigit_K_T(letter);
    }
}

function convertLetterToDigit_K_T(letter){
    if(/k|K/.test(letter)){
        return '+0';
    }else if(/l|L/.test(letter)){
        return '+1';
    }else if(/m|M/.test(letter)){
        return '+2';
    }else if(/n|N/.test(letter)){
        return '+3';
    }else if(/o|O/.test(letter)){
        return '+4';
    }else if(/p|P/.test(letter)){
        return '+5';
    }else if(/q|Q/.test(letter)){
        return '+6';
    }else if(/r|R/.test(letter)){
        return '+7';
    }else if(/s|S/.test(letter)){
        return '+8';
    }else if(/t|T/.test(letter)){
        return '+9';
    }else{
        // [u - z] <-> [++0 - ++5]
        return convertLetterToDigit_U_Z(letter);
    }
}

function convertLetterToDigit_U_Z(letter){
    if(/u|U/.test(letter)){
        return '++0';
    }else if(/v|V/.test(letter)){
        return '++1';
    }else if(/w|W/.test(letter)){
        return '++2';
    }else if(/x|X/.test(letter)){
        return '++3';
    }else if(/y|Y/.test(letter)){
        return '++4';
    }else if(/z|Z/.test(letter)){
        return '++5';
    }else 
        return 'unvalid_char';
}

function convertDigitToLetter(digit){
    if(digit==='0')
        return 'a';
    else if(digit==='1')
        return 'b';
    else if(digit==='2')
        return 'c';
    else if(digit==='3')
        return 'd';
    else if(digit==='4')
        return 'e';
    else if(digit==='5')
        return 'f';
    else if(digit==='6')
        return 'g';
    else if(digit==='7')
        return 'h';
    else if(digit==='8')
        return 'i';
    else if(digit==='9')
        return 'j';
    else 
        return 'unvalid_char';
}

function convertSpecialCharToDigit(char){
    if(char==='(')
        return '-0';
    else if(char===')')
        return '-1';
    else if(char==='!')
        return '-2';
    else if(char==='&')
        return '-3';
    else if(char==='#')
        return '-4';
    else if(char==='%')
        return '-5';
    else if(char==='*')
        return '-6';
    else if(char==='=')
        return '-7';
    else if(char==='@')
        return '-8';
    else if(char==='$')
        return '-9';
    else 
        return 'unvalid_char';
}

exports.decode = function decode(pattern){
    let str = "".split();
    let strCounter=0;

    for(let counter=0; counter < pattern.length; counter++){
        if(pattern[counter]==='^'){
            // capital letter indicator
            counter++; // to next position of pattern
            if(pattern[counter]==='+'){
                // [+0 - +9] or [++0 - ++5]
                counter++; // to next position of pattern
                if(pattern[counter]==='+'){
                    // [++0 - ++5] <-> [U - Z]
                    counter++; // to next position of pattern
                    str[strCounter] = convertDigitToLetter_U_Z(pattern[counter]).toUpperCase(); // convert current digit to equivalent letter [u - z]
                    strCounter++;
                }else if(/[0-9]/.test(pattern[counter])){
                    // [+0 - +9] <-> [K - T]
                    str[strCounter] = convertDigitToLetter_K_T(pattern[counter]).toUpperCase(); // convert current digit to equivalent letter [k - t]
                    strCounter++;
                }
            }else if(/[0-9]/.test(pattern[counter])){
                // [0 - 9] <-> [A - J]
                str[strCounter] = convertDigitToLetter_A_J(pattern[counter]).toUpperCase();
                strCounter++;
            }
        }else if(pattern[counter]==='+'){
            // [+0 - +9] or [++0 - ++5]
            counter++; // to next position of pattern
            if(pattern[counter]==='+'){
                // [++0 - ++5] <-> [u - z]
                counter++; // to next position of pattern
                str[strCounter] = convertDigitToLetter_U_Z(pattern[counter]); // convert current digit to equivalent letter [u - z]
                strCounter++;
            }else if(/[0-9]/.test(pattern[counter])){
                // [+0 - +9] <-> [k - t]
                str[strCounter] = convertDigitToLetter_K_T(pattern[counter]); // convert current digit to equivalent letter [k - t]
                strCounter++;
            }
        }else if(/[0-9]/.test(pattern[counter])){
            // [0 - 9] <-> [a - j]
            str[strCounter] = convertDigitToLetter_A_J(pattern[counter]);
            strCounter++;
        }else if(pattern[counter]==='-'){
            // special char indicator
            counter++; // to the next position of pattern
            str[strCounter] = convertDigitToSpecialChar(pattern[counter]); // convert current digit to equivalent special char [0 - 9] <-> [( - $]
            strCounter++;
        }else if(/[a-j]/.test(pattern[counter])){
            // [a - j] <-> [0 - 9]
            str[strCounter] = convertLetterToDigit(pattern[counter]); // convert current letter to equivalent digit
            strCounter++;
        }else if(pattern[counter]==='A'){
            str[strCounter] = ' ';
            strCounter++;
        }else if(pattern[counter]==='Z'){
            str[strCounter] = '\n';
            strCounter++;
        }else if(pattern[counter]==='I'){
            str[strCounter] = ',';
            strCounter++;
        }else if(pattern[counter]==='E'){
            str[strCounter] = '.';
            strCounter++;
        }else{
            // prevented char 
            str[strCounter] = pattern[counter]; // print regardlesly;
            strCounter++;
        }
    }

    return str.join('');
}

function convertDigitToLetter_A_J(digit){
    if(digit==='0')
        return 'a';
    else if(digit==='1')
        return 'b';
    else if(digit==='2')
        return 'c';
    else if(digit==='3')
        return 'd';
    else if(digit==='4')
        return 'e';
    else if(digit==='5')
        return 'f';
    else if(digit==='6')
        return 'g';
    else if(digit==='7')
        return 'h';
    else if(digit==='8')
        return 'i';
    else if(digit==='9')
        return 'j';
    else 
        return 'unvalid_char';
}

function convertDigitToLetter_K_T(digit){
    if(digit==='0')
        return 'k';
    else if(digit==='1')
        return 'l';
    else if(digit==='2')
        return 'm';
    else if(digit==='3')
        return 'n';
    else if(digit==='4')
        return 'o';
    else if(digit==='5')
        return 'p';
    else if(digit==='6')
        return 'q';
    else if(digit==='7')
        return 'r';
    else if(digit==='8')
        return 's';
    else if(digit==='9')
        return 't';
    else 
        return 'unvalid_char';
}

function convertDigitToLetter_U_Z(digit){
    if(digit==='0')
        return 'u';
    else if(digit==='1')
        return 'v';
    else if(digit==='2')
        return 'w';
    else if(digit==='3')
        return 'x';
    else if(digit==='4')
        return 'y';
    else if(digit==='5')
        return 'z';
    else 
        return 'unvalid_char';
}

function convertLetterToDigit(letter){
    if(letter==='a')
        return '0';
    else if(letter==='b')
        return '1';
    else if(letter==='c')
        return '2';
    else if(letter==='d')
        return '3';
    else if(letter==='e')
        return '4';
    else if(letter==='f')
        return '5';
    else if(letter==='g')
        return '6';
    else if(letter==='h')
        return '7';
    else if(letter==='i')
        return '8';
    else if(letter==='j')
        return '9';
    else 
    return 'unvalid_char';
}

function convertDigitToSpecialChar(digit){
    if(digit==='0')
        return '(';
    else if(digit==='1')
        return ')';
    else if(digit==='2')
        return '!';
    else if(digit==='3')
        return '&';
    else if(digit==='4')
        return '#';
    else if(digit==='5')
        return '%';
    else if(digit==='6')
        return '*';
    else if(digit==='7')
        return '=';
    else if(digit==='8')
        return '@';
    else if(digit==='9')
        return '$';
    else 
        return 'unvalid_char';
}

