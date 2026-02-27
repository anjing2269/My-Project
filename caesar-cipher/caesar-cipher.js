'use strict'; // 厳格モードを使用

// 各種入力の取得
const formInput = document.getElementById('form');
const textInput = document.getElementById('text');
const shiftInput = document.getElementById('shift');
const convertButton = document.getElementById('convert-button');
const resultDivision = document.getElementById('result-area');

const caesarCipherObj = {
  // アルファベットの設定
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

  // 大文字の判定
  isUpperCase: function (str) {
    const result = str === str.toUpperCase();
    return result
  },

  // 文字の情報が入っている配列の作成
  createTexts: function (string) {
    const texts = [];
    for (let str of string) {
      texts.push({
        char: str,
        isAlphabet: true,
        isUpperCase: true,
        number: NaN,
        shiftNumber: NaN,
        convertedChar: '',
        resultChar: '',
      });
    }
    return texts;
  },

  characterJudgment: function (obj) {
    const char = obj.char;
    if (/[A-Za-z]/.test(char)) {
      obj.isAlphabet = true;
    } else {
      obj.isAlphabet = false;
    }
  },

  // シーザー暗号に変換
  caesarCipher: function (string, shiftOf) {
    const texts = this.createTexts(string);
    for (let text of texts) {
      this.characterJudgment(text);
      if (!text.isAlphabet) {
        text.resultChar = text.char;
        continue;
      }
      text.isUpperCase = this.isUpperCase(text.char);
      text.number = this.convertToNumber(text.char);
      text.shiftNumber = this.shiftNumber(text.number, shiftOf);
      text.convertedChar = this.convertToCharacter(text.shiftNumber);
      if (text.isUpperCase) {
        text.resultChar = text.convertedChar;
      } else {
        text.resultChar = text.convertedChar.toLowerCase();
      }
    }
    const resultText = texts.map((text) => text.resultChar).join('');

    const result = resultText;
    return result;
  },

  // 1、文字を番号に変換
  convertToNumber: function (char) {
    char = char.toUpperCase();
    const result = caesarCipherObj.alphabet.indexOf(char);
    return result;
  },

  // 2、番号をシフト
  shiftNumber: function (num, shiftOf) {
    let shift = (num + shiftOf) % 26;
    if (shift < 0) {
      shift += 26;
    } else {
      shift += 0;
    }

    const result = shift;
    return result;
  },

  // 3、番号を文字に変換
  convertToCharacter: function (num) {
    const result = caesarCipherObj.alphabet[num];
    return result;
  },
}

convertButton.addEventListener('click', showResults);

function showResults() {
  const validation = formInput.reportValidity();

  if (validation) {
    const text = textInput.value;
    const shift = shiftInput.valueAsNumber

    // 変換結果表示エリアの作成
    {
      // エリアのリセット
      resultDivision.innerText = '';

      // headerDivision の作成
      const headerDivision = document.createElement('h5');
      headerDivision.setAttribute('class', 'card-header');
      headerDivision.innerText = '変換結果';

      // bodyDivision の作成
      const bodyDivision = document.createElement('div');
      bodyDivision.setAttribute('class', 'card-body');

      { // textarea の作成
        const textarea = document.createElement('textarea');
        textarea.setAttribute('class', 'form-control');
        textarea.setAttribute('id', 'result-text');
        textarea.setAttribute('rows', 5);
        textarea.setAttribute('readonly', 'readonly');
        const result = caesarCipherObj.caesarCipher(text, shift);
        textarea.innerText = result;
        bodyDivision.appendChild(textarea);
      }

      { // button の作成
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-outline-primary btn-sm');
        button.setAttribute('id', 'copy-button');
        button.innerText = 'テキストをコピー';
        bodyDivision.appendChild(button);
      }


      // resultDivision に Bootstrap のスタイルを適用する
      resultDivision.setAttribute('class', 'card');

      // headerDivision と bodyDivision を resultDivision に差し込む
      resultDivision.appendChild(headerDivision);
      resultDivision.appendChild(bodyDivision);
    }
  }
}

function test() {
  console.log('変換のテスト');

  console.group('大文字のみ');
  console.log('暗号化');
  const test1 = caesarCipherObj.caesarCipher('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', -3);
  const correct1 = 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD';
  console.assert(test1 === correct1, '変換が正しくありません');

  console.log('復号');
  const test2 = caesarCipherObj.caesarCipher('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD', 3);
  const correct2 = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';
  console.assert(test2 === correct2, '変換が正しくありません');
  console.groupEnd();

  console.group('小文字・記号あり');
  console.log('暗号化');
  const test3 = caesarCipherObj.caesarCipher('Hello, World.', 23);
  const correct3 = 'Ebiil, Tloia.';
  console.assert(test3 === correct3, '変換が正しくありません');

  console.log('復号');
  const test4 = caesarCipherObj.caesarCipher('Ebiil, Tloia.', -23);
  const correct4 = 'Hello, World.';
  console.assert(test4 === correct4, '変換が正しくありません');
  console.groupEnd();

  console.group('大きな数字');
  console.log('暗号化');
  const test5 = caesarCipherObj.caesarCipher('Hello, World.', 117910);
  const correct5 = 'Hello, World.';
  console.assert(test5 === correct5, '変換が正しくありません');

  console.log('復号');
  const test6 = caesarCipherObj.caesarCipher('Hello, World.', -117910);
  const correct6 = 'Hello, World.';
  console.assert(test6 === correct6, '変換が正しくありません');
  console.groupEnd();

  console.log('変換のテスト終了');
}

test();