// 조건부 타입
type A = number extends string ? string : number;

// 객체 타입으로 조건부 타입 만들기
type ObjA = { // super type
    a: string;
};

type ObjB = {
    a: string;
    b: number;
};

type B = ObjB extends ObjA ? number : string; // number

// generic 조건부 타입
type StringNumberSwitch<T> = T extends number ? string : number; 
// 항상 입력 타입의 반대로, T가 number이면 string가 되고, string이면 number가 됨. 

let varA: StringNumberSwitch<number>; // string 타입
let varB: StringNumberSwitch<string>; // number 타입

// 공백을 모두 제거하는 함수

// 함수 오버로딩 활용해서 any 사용 최소화하기
function removeSpaces<T> (text: T): T extends string ? string : undefined;

function removeSpaces (text: any) {
    if (typeof text === "string") {
        return text.replaceAll(" ", "");
    } else {
        return undefined;
    }
}

let result = removeSpaces("Hello World"); // "HelloWorld" 타입
result.toUpperCase();

// 분산적인 조건부 타입

// type StringNumberSwitch<T> = T extends number ? string : number; 
// 항상 입력 타입의 반대로, T가 number이면 string가 되고, string이면 number가 됨. 

let a : StringNumberSwitch<number | string>; // string | number 타입
let b : StringNumberSwitch<string | boolean>; // number 타입
let d : StringNumberSwitch<string | number | boolean>; // string | number 타입

// 예제
type Exclude <T, U> = T extends U ? never : T; // T에서 U에 해당하는 타입을 제외한 나머지 타입

type ExcludeExample = Exclude<string | number | boolean, string>; // number | boolean

type Extract <T, U> = T extends U ? T : never ; // T에서 U에 해당하는 타입만 추출

type ExtractExample = Extract<string | number | boolean, string>; // string


// infer

type funcA = () => string;
type funcB = () => number;

// infer R 은 조건식을 참으로 만드는 타입을 추론하도록 동작함
type ReturnType<T> = T extends () => infer R ? R : never;

type exA = ReturnType<funcA>; // string
type exB = ReturnType<funcB>; // number
type exC = ReturnType<number>; // never: R이 뭐가 되어도 조건식이 참이 될 수 없음



// 예시
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;

type PromiseA = PromiseUnpack<Promise<number>>; // number
type PromiseB = PromiseUnpack<Promise<string>>; // string