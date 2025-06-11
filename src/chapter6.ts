// 제네릭 함수
function genericFunction<T>(value: T): T {
    return value;
}

// 사용 예시
let num = genericFunction(10); // number 타입
let str = genericFunction("Hello"); // string 타입
let arr0 = genericFunction([1, 2, 3]); // number[] 타입
// 그런데 여기서, arr의 타입을 number[]가 아닌 튜플로 지정하고 싶다면? 
// 방법 1: 타입 단언
let arr1 = genericFunction([1, 2, 3] as [number, number, number]); 
// 방법 2
let arr2 = genericFunction<[number, number, number]>([1, 2, 3]); 


// 타입 변수 응용하기
function swap <T, U>(a: T, b: U): [U, T] {
    return [b, a];
}

// 사용 예시
const [a, b] = swap(10, "Hello"); 

function returnFirstValue<T> (data: [T, ...unknown[]]) {
    return data[0];
}

// 사용 예시
const firstValue = returnFirstValue([1, true, "three"]);

const firstNumber = returnFirstValue([1, 2, 3]); // number 타입
const firstString = returnFirstValue(["apple", "banana"]); // string 타입

function getLength<T extends { length: number }>(data: T) {
    return data.length;
}

// 사용 예시
const lengthOfArray = getLength([1, 2, 3]); 
const lengthOfString = getLength("Hello"); 
const lengthOfObject = getLength({ length: 5, name: "Object" }); 
// const lengthOfNumber = getLength(123); // 오류 발생, number 타입은 length 속성이 없음

// map
const arr5 = [1, 2, 3, 4, 5];

const mappedArr = arr5.map((item) => item * 2); // number[] 타입

// 직접 정의해보기

function map<T, U>(arr: T[], callback: (item: T) => U) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]));
    }
    return result;

}

const arr = [1, 2, 3, 4, 5];

map(arr, (item) => item * 2); // number[] 타입
map(["apple", "banana", "cherry"], (item) => item.toUpperCase()); // string[] 타입
map(["apple", "banana", "cherry"], (item) => parseInt(item)); // number[] 타입

// forEach

const arrForEach = [1, 2, 3, 4, 5];
arrForEach.forEach((item) => console.log(item * 2)); 

// 직접 정의해보기
function forEach<T>(arr: T[], callback: (item: T) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

// 사용 예시
forEach(arrForEach, (item) => console.log(item * 2)); // number 타입
forEach(["apple", "banana", "cherry"], (item) => console.log(item.toUpperCase())); // string 타입

// 제네릭 인터페이스

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
// 사용 예시
const pair1: KeyValuePair<string, number> = {
    key: "age",
    value: 30
};

// 인덱스 시그니처 복습
interface StringNumberMap {
    [key: string]: number;
}

// 사용 예시
const stringNumberMap: StringNumberMap = {
    "one": 1,
    "two": 2,
    "three": 3
};

// 인덱스 시그니처를 제네릭 인터페이스에 적용하기
interface GenericMap<V> {
    [key: string]: V;
}

// 사용 예시
const genericNumberMap: GenericMap<number> = {
    "one": 1,
    "two": 2,
    "three": 3
};

const genericBooleanMap: GenericMap<boolean> = {
    "isTrue": true,
    "isFalse": false
};

// 제네릭 타입 별칭

type Pair<V> = {
    [key: string]: V;
};

// 사용 예시
const pair2: Pair<string> = {
    key: "age",
    value: "30"
};

// 활용 예시

interface Student {
    type: "student";
    school: string;
}

interface Developer {
    type: "developer";
    skill: string;
}

interface User<T> {
    name: string;
    profile: T; // profile: Student | Developer 에서 제네릭으로 변경 !!
}

function goToSchool(user: User<Student>) { // User<Student> 로 수정 ! 
    // 타입 가드로 타입을 좁힐 필요가 더 이상 없어짐!
    // if (user.profile.type !== "student") {
    //     console.log("This user is not a student."); 
    //     return;
    // }
    console.log(`${user.name} goes to ${user.profile.school}.`);
}



const developerUser: User<Developer> = {
    name: "Alice",
    profile: {
        type: "developer",
        skill: "TypeScript"
    }
};

const studentUser: User<Student> = {
    name: "Bob",
    profile: {
        type: "student",
        school: "XYZ University"
    }
};

// 제네릭 클래스

class GenericList<T> {
    constructor(private items: T[]) {}

    push(item: T) {
        this.items.push(item);
    }
    pop() {
        this.items.pop();
    }
    
    getItems(){
        console.log(this.items);
    }
}

const numberList = new GenericList([1, 2, 3]);
numberList.push(4);
numberList.getItems(); // [1, 2, 3, 4]

const stringList = new GenericList(["apple", "banana", "cherry"]); 

// Promise 와 Generic

const promise = new Promise<string>(((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, Promise!");
        reject("Error occurred");
    }, 3000);
}));

promise.then((result) => {
    console.log(result); // "Hello, Promise!"
});

promise.catch((error) => {
    console.error(error); // "Error occurred"
});

// Promise를 반환하는 함수의 타입 정의하기

interface Post {
    id: number;
    title: string;
    content: string;
}

function fetchPosts(): Promise<Post[]>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", content: "Content of Post 1" },
                { id: 2, title: "Post 2", content: "Content of Post 2" }
            ]);
        }, 3000);
    });
}

const postRequest = fetchPosts();

postRequest.then((posts) => {
    console.log(posts[0].title); // "Post 1"
    console.log(posts[1].content); // "Content of Post 2"
}).catch((error) => {
    console.error("Error fetching posts:", error);
});