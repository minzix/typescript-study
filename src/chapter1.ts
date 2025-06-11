// number 
let num1: number = 10;
let num2: number = -1;
let num3: number = 0;
let num4: number = 1.5;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;

// string
let str1: string = "Hello";
let str2: string = 'World';
let str3: string = `Hello World`;
let str4: string = `Hello ${str2}`;

// null
let null1: null = null;

// undefined
let undefined1: undefined = undefined;

// 리터럴 타입 (Literal Types)
let numA:10 = 10;
let strA:"hello" = "hello";
let boolA:true = true;

// 배열
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 배열에 들어가는 원소의 타입이 서로 다를 때
let arr3: (number | string)[] = [1, "2", 3];

// 다차원 배열
let arr4: number[][] = [[1, 2], [3, 4]];

// 튜플 (Tuple)
let tuple1: [number, number] = [1, 2]; // 정해진 길이(2)와 타입(number)을 가진 배열
let tuple2: [number, string, boolean] = [1, "hello", true];

// 객체
let user: { // 객체 리터럴 타입
    id: number,  
    name: string,
    age?: number // ?는 선택적 속성
} = {
    id: 1,
    name: "John",
    age: 30,
}

user = {
    id: 2,
    name: "Jane",
    // age 속성은 선택적이므로 생략 가능
}

// 객체의 속성 값 변경 방지 방법
let config : {
    readonly apiKey: string, // readonly 속성으로 변경 방지
} = {
    apiKey: "MY_API_KEY",
}

// config.apiKey = "NEW_API_KEY"; // 오류 발생

// 타입 별칭

type User = { // 타입 별칭
    id: number,  
    name: string,
    age: number, 
    email: string,
    job: string,
}

let user1: User = {
    id: 1,
    name: "John",
    age: 30,
    job: "Developer",
    email: "example@google.com"
}

let user2: User = {
    id: 2,
    name: "minji",
    age: 23,
    job: "Developer",
    email: "example@google.com"
}

// 인덱스 시그니처
type countryCodes = {
    [key: string]: string; // 문자열 키와 문자열 값을 가지는 객체
}

let countryCodes: countryCodes = {
    Korea: "ko",
    USA: "us",
    Japan: "jp",
}

// Enum (열거형)

enum Role {
    ADMIN = 0, 
    USER = 1, 
    GUEST = 2 // 숫자를 할당하지 않아도 자동으로 0, 1, 2가 됨
}

enum Language {
    KOREAN = "ko",
    ENGLISH = "en",
    JAPANESE = "jp"
}

const user3 = {
    name: "John",
    role: Role.ADMIN, // ADMIN = 0
    language: Language.KOREAN // KOREAN = "ko"
}

// Any

let anyValue: any = "Hello"; // 어떤 타입이든 허용

anyValue = 10; // 숫자도 허용
anyValue = true; // 불리언도 허용
anyValue = { key: "value" }; // 객체도 허용
anyValue = () => {} // 함수도 허용

anyValue.toUpperCase(); // 문자열 메서드도 호출 가능
anyValue.toFixed(); // 숫자 메서드도 호출 가능

let num: number = 10;
num = anyValue; // any 타입은 다른 타입으로의 할당이 가능

// unknown

let unknownValue: unknown; // 어떤 타입이든 허용

unknownValue = "Hello"; // 문자열
unknownValue = 10; // 숫자
unknownValue = true; // 불리언
unknownValue = { key: "value" }; // 객체
unknownValue = () => {}; // 함수

// unknown 타입은 다른 타입으로의 할당이 불가능
let num10: number = 10;
// num10 = unknownValue; // 오류 발생

// unknown 타입을 사용하려면 타입 정제가 필요함
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase()); // 문자열 메서드 호출 가능
}
if (typeof unknownValue === "number") {
    console.log(unknownValue.toFixed(2)); // 숫자 메서드 호출 가능
}

// void

function printHello(): void {
    console.log("Hello, TypeScript!");
}

function returnHello(): string {
    return "Hello, TypeScript!";
}

// never

function infiniteLoop(): never {
    while (true) {
        // 무한 루프
    }
}

function throwError(): never {
    throw new Error(); 
}