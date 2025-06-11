// 인터페이스

interface Person {
  readonly name: string;
  age?: number;
//   이렇게 쓰면 메소드 오버로딩을 못 알아먹음
//   sayHello: () => void;
//   sayHello: (a: number) => void;
//   호출 시그니처 권장
    sayHello(): void;
    sayHello(a: number): void;
}

const person: Person = {
    name: "홍길동",
    age: 30,
    sayHello() {
        console.log(`안녕하세요, 제 이름은 ${this.name}입니다.`);
    }
};

// person.name = "김철수"; // 오류 발생: name은 읽기 전용 속성입니다.


// 인터페이스 확장

interface Animal {
    name: string;
    color: string;
}

interface Dog extends Animal {
    isBark: boolean;
}

interface Cat extends Animal {
    isMeow: boolean;
}

// 다중 확장 (여러 인터페이스를 확장)도 가능!
interface DogCat extends Dog, Cat {
}

const dogCat: DogCat = {
    name: "멍냥이",
    color: "갈색",
    isBark: true,
    isMeow: true
};

interface Chicken extends Animal {
    name: "꼬꼬"; // 부모 속성의 타입의 서브타입이라면 재정의 가능!
    // string ⊃ "꼬꼬" 이므로 재정의 가능
    isCluck: boolean;
}


// 인터페이스 합치기

interface Person01 {
    name: string;
}

interface Person01 {
    age: number;
}

// 결국 속성들이 다 합쳐짐
const person01: Person01 = {
    name: "김철수",
    age: 25
};

// 모듈 보강

interface Lib { // 1. 원본 모듈
    a: number;
    b: string;
}

interface Lib { // 4. 보강 모듈을 우리가 정의해서 속성 추가!
    c: boolean;
}

const lib: Lib = {
    a: 1,
    b: "hello",
    c: true // 2. 우리는 c 속성도 필요함 .. 
    // 3. 근데 그냥 쓰면 오류가 남
};