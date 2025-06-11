// 일반적인 함수의 타입 정의
function add(x: number, y: number): number {
    return x + y;
}

// 화살표 함수의 타입 정의
const subtract = (x: number, y: number): number => {
    return x - y;
};

// 선택 인자와 기본값을 가진 함수
// 선택적 매개변수(?) 는 항상 필수 매개변수들 (? 없는 애들) 뒤에 와야 함!
function introduce(name: string, age: number = 30, height?: number): string { 
    return `이름: ${name}, 나이: ${age}, 키: ${height?? "알 수 없음"}`;
    // height는 사칙연산을 할 수 없음. 타입 좁히기 이후에나 가능. 
}

introduce("홍길동"); // 기본값 사용
introduce("홍길동", 25); // 기본값 사용하지 않음
// introduce(23, 25); // 타입 오류 발생: 첫 번째 인자는 string이어야 합니다.
introduce("홍길동", 25, 175); // 선택 인자 사용

// rest ... 연산자 사용
function sum(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => ( total += num ));
    return total;
}

sum(1, 2, 3, 4, 5); // 15

// 함수 타입 표현식
type Operation = (x: number, y: number) => number;
// const addition: (x: number, y: number) => number = (x, y) => { return x + y; }; // 이것도 가능!
const addition: Operation = (x, y) => { return x + y; };
const subtraction: Operation = (x, y) => { return x - y; };
const multiplication: Operation = (x, y) => { return x * y; };
const division: Operation = (x, y) => { return x / y; };

// 호출 시그니처

type Operation2 = {
    (x: number, y: number): number;
}

const addition2: Operation2 = (x, y) => { return x + y; };
const subtraction2: Operation2 = (x, y) => { return x - y; };
const multiplication2: Operation2 = (x, y) => { return x * y; };
const division2: Operation2 = (x, y) => { return x / y; };

// 함수 타입의 호환성
// 1. 반환값의 타입이 호환되는가?
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b // 업캐스팅: A는 B의 하위 타입이므로 할당 가능
// b = a // 다운캐스팅: B는 A의 하위 타입이 아니므로 할당 불가능

// 2. 매개변수의 타입이 호환되는가?
// 2-1. 매개변수의 개수가 같은 경우
type C = (value: number) => void;
type D = (value: number) => void;

let c : C = (value) => {};
let d : D = (value) => {};

// C와 D는 동일한 타입이므로 할당 가능
c = d; 
d = c; 

// 객체 타입 만들어보기
type Animal = {
    name: string;
}

type Dog = {
    name: string;
    color: string;
}


let animalFunction = (animal: Animal) => {
    console.log(`이름: ${animal.name}`);
}

let DogFunction = (dog: Dog) => {
    console.log(`이름: ${dog.name}, 색상: ${dog.color}`);
}

// animalFunction = DogFunction; // 업캐스팅: Dog는 Animal의 하위 타입이므로 할당 가능 
DogFunction = animalFunction; // 다운캐스팅: Animal은 Dog의 하위 타입이 아니므로 할당 불가능

// 즉, 매개변수의 타입을 기준으로 판단하며 매개변수의 개수가 같은 경우, 업캐스팅은 불가, 다운캐스팅은 허용됨. (통상적인 경우와 정반대)
// 업캐스팅: 서브타입(하위타입)을 -> 슈퍼타입(상위타입)으로 할당하는 것
// 다운캐스팅: 슈퍼타입(상위타입)을 -> 서브타입(하위타입)으로 할당하는 것

// 2-2. 매개변수의 개수가 다른 경우
type Func1 = (x: number, y: number) => void;
type Func2 = (x: number) => void;

let func1: Func1 = (x, y) => {};
let func2: Func2 = (x) => {};

func1 = func2; // (매개변수 개수 ↑) = (매개변수의 개수 ↓) 에 할당 가능
// func2 = func1; // (매개변수 개수 ↓) = (매개변수의 개수 ↑) 에 할당 불가능
// 즉, 매개변수의 개수가 다른 경우, 매개변수의 개수가 적은 쪽이 많은 쪽에 할당 가능

// 함수 오버로딩

// 오버로딩은 함수의 이름은 같지만 매개변수의 타입이나 개수가 다른 여러 버전을 정의하는 것

// 함수의 이름은 functionOverload 로 정의하기
// VERSION 1: 매개변수가 1개 -> 매개변수에 20을 곱한 값 반환
// VERSION 2: 매개변수가 3개 -> 세 매개변수의 합 반환

// 오버로드 시그니처: 구현 부분 (body) 없이 선언식만 딱 적어둠
function functionOverload(x: number): void;
function functionOverload(x: number, y: number, z: number): void;

// 구현 부분: 오버로드 시그니처에 맞게 구현
function functionOverload(x: number, y?: number, z?: number) {
    if (typeof y === 'number' && typeof z === 'number') {
        // VERSION 2: 매개변수가 3개인 경우
        return x + y + z;
    } else {
        // VERSION 1: 매개변수가 1개인 경우
        return x * 20;
    }
};

// 사용자 정의 타입 가드

type Doggie = {
    name: string;
    isBarking: boolean;
}

type Cat = {
    name: string;
    isMeowing: boolean;
}

type Animals = Doggie | Cat;

function isDog(animal: Animals): animal is Doggie { // 사용자 정의 타입 가드
    return (animal as Doggie).isBarking !== undefined;
}

function warning (animal: Animals): string {
    if (isDog(animal)) {
        return `${animal.name} is barking!`;
    } else {
        return `${animal.name} is meowing!`;
    }
}