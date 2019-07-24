const testArr = (function () {
  const arr = new Array(1000000);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = Number((Math.random() * 10).toFixed());
  }
  return arr;
}());

console.log(`处理的数组长度${testArr.length}`);

function loggerDistinctTime(testArr, distinctFunction, distinctFunctionName) {
  const start = Date.now();
  const arr = distinctFunction(testArr);
  const end = Date.now();
  const takeUpTime = end - start;
  console.log(`耗时：${takeUpTime}  ${distinctFunctionName}, 去重后数组: ${arr}, 去重后数组长度${arr.length}`);
}

function distinctDoubleFor(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j -= 1;
      }
    }
  }
  return arr;
}

function distinctEs6Set(arr) {
  const distinctArr = new Set(arr);
  return [...distinctArr];
}

function distinctEs5FilterAndIndexOf(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function distinctEs5IndexOfAndFor(arr) {
  const distinctArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (distinctArr.indexOf(arr[i]) === -1) {
      distinctArr.push(arr[i]);
    }
  }
  return distinctArr;
}

function distinctEs5IndexOfAndForEach(arr) {
  const distinctArr = [];
  arr.forEach((item) => {
    if (distinctArr.indexOf(item) === -1) {
      distinctArr.push(item);
    }
  });
  return distinctArr;
}

function distinctEs5ForEachAndEvery(arr) {
  const distinctArr = [];
  arr.forEach((item) => {
    if (distinctArr.every(distinctArrItem => distinctArrItem !== item)) {
      distinctArr.push(item);
    }
  });
  return distinctArr;
}

function distinctEs5ForEachAndIncludes(arr) {
  const distinctArr = [];
  arr.forEach((item) => {
    if (!distinctArr.includes(item)) {
      distinctArr.push(item);
    }
  });
  return distinctArr;
}


function distinctEs5ForAndIncludes(arr) {
  const distinctArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!distinctArr.includes(arr[i])) {
      distinctArr.push(arr[i]);
    }
  }
  return distinctArr;
}

function distinctEs5forAndEvery(arr) {
  const distinctArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (distinctArr.every(distinctArrItem => distinctArrItem !== arr[i])) {
      distinctArr.push(arr[i]);
    }
  }
  return distinctArr;
}

function distinctEs5SortAndFor(arr) {
  const sortArr = arr.sort((a, b) => a - b);
  for (let i = 0; i < sortArr.length; i += 1) {
    if (sortArr[i] === sortArr[i + 1]) {
      sortArr.splice(i, 1);
      i -= 1;
    }
  }
  return sortArr;
}

function distinctBubblingAndFor(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      if (arr[j] > arr[j + 1]) {
        const exchange = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = exchange;
      }
    }
  }

  for (let n = 0; n < arr.length; n += 1) {
    if (arr[n] === arr[n + 1]) {
      arr.splice(n, 1);
      n -= 1;
    }
  }
  return arr;
}

function distinctEs6ForOfAndFor(arr) {
  const distinctArr = [];
  const distObject = {};
  for (const item of arr) {
    if (!distObject[item]) {
      distinctArr.push(item);
      distObject[item] = 'distinct';
    }
  }
  return distinctArr;
}

// es5 语法
loggerDistinctTime([...testArr], distinctDoubleFor, '双重循环去重');
loggerDistinctTime([...testArr], distinctEs5FilterAndIndexOf, 'es5filter和indexOf去重');
loggerDistinctTime([...testArr], distinctEs5IndexOfAndForEach, 'es5indexOf和forEach循环去重');
loggerDistinctTime([...testArr], distinctEs5IndexOfAndFor, 'es5indexOf和for循环去重');
loggerDistinctTime([...testArr], distinctEs5forAndEvery, 'es5every和for循环去重');
loggerDistinctTime([...testArr], distinctEs5ForEachAndEvery, 'es5every和forEach循环去重');
loggerDistinctTime([...testArr], distinctEs5ForAndIncludes, 'es5Includes和for循环去重');
loggerDistinctTime([...testArr], distinctEs5ForEachAndIncludes, 'es5Includes和forEach循环去重');
// es6 语法
loggerDistinctTime([...testArr], distinctEs6ForOfAndFor, 'es6forOf和obj去重');
loggerDistinctTime([...testArr], distinctEs6Set, 'es6Set去重');
// 这两种写法不推荐， 属于可从代码实现就能分辨出来相当于三重for循环（es5 语法）
loggerDistinctTime([...testArr], distinctEs5SortAndFor, 'es5sort和for循环去重');
loggerDistinctTime([...testArr], distinctBubblingAndFor, 'es5冒泡算法排序和for循环去重');

