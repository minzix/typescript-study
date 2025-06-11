// unknown 타입

function unknownTest() {
    // 업캐스팅 → 가능!
    let a: unknown = 1;
    let b: unknown = "hello";
    let c: unknown = true;
    let d: unknown = { name: "John" };
    let e: unknown = [1, 2, 3];
    let f: unknown = null;
    let g: unknown = undefined;

    // 다운 캐스팅 → 불가!
    let unknownValue: unknown = "hello";
    // let strValue: string = unknownValue; // 오류 발생
    // let numValue: number = unknownValue; // 오류 발생
    // let boolValue: boolean = unknownValue; // 오류 발생
    // let objValue: object = unknownValue; // 오류 발생
}

// never

function neverTest() {
    function infiniteLoop(): never {
        while (true) {
            // 무한 루프
        }
    }

    // infiniteLoop()는 절대 값을 반환하지 않지만,
    // 타입스크립트는 이를 never로 간주하므로 어떤 타입에도 할당 가능
    let num: number = infiniteLoop(); // number 타입 변수에 할당 (문제 없음)
    let str: string = infiniteLoop(); // string 타입 변수에 할당 (문제 없음)
    let bool: boolean = infiniteLoop(); // boolean 타입 변수에 할당 (문제 없음)
    let obj: object = infiniteLoop(); // object 타입 변수에 할당 (문제 없음)

    // never 타입 변수에는 어떤 값도 할당할 수 없음 (컴파일 오류 발생)
    // let neverValue: never = 10; // 오류: '10'은 never 타입이 아님
}

// void
function voidTest() {
    function voidFunction(): void {
        console.log("This function returns nothing.");
        return undefined; // 명시적으로 undefined 반환 가능
    }
    let voidValue: void = undefined; // void 타입 변수에 undefined 할당 가능
}

// any

function anyTest() {
    let unknownValue: unknown;
    let anyValue: any;
    let undefinedValue: undefined;

    // any 타입은 다운캐스팅도 가능함!
    anyValue = unknownValue; // 다운캐스팅
    anyValue = undefinedValue; // 다운캐스팅

    // 딱 하나 허용되지 않는 다운캐스팅
    let neverValue: never;
    // neverValue = anyValue; // 오류
}


// 객체 간 타입 호환성

type Animal = { // 슈퍼 타입
    name: string;
    color: string;
}

type Dog = { // 서브 타입
    name: string;
    color: string;
    breed: string;
}

let dog: Dog = {
    name: "양갱이",
    color: "Brown",
    breed: "치와와"
};

let animal: Animal = {
    name: "기린",
    color: "yellow"
};

animal = dog // Dog는 Animal의 하위 타입이므로 호환 가능
// dog = animal; // 오류 발생! Animal은 Dog의 상위 타입이 아니므로 호환 불가

// 대수 타입: 합집합
let a: string | number | boolean | undefined | null;

a = "hello"; // string 타입
a = 42; // number 타입
a = true; // boolean 타입
a = undefined; // undefined 타입
a = null; // null 타입

let arr: (string | number)[] = []; // string 또는 number 타입의 배열
arr = ["hello", 42]; // string과 number를 모두 포함할 수 있음

// 객체로 대수 타입 사용하기
// type Person = {
//     name: string;
//     age: number;
// }

// type Car = {
//     name: string;
//     color: string;
// }

type Union1 = Person | Car; // Person 또는 Car 타입

let union1: Union1 = {
    name: "John",
    age: 30
};

let union2: Union1 = {
    name: "Toyota",
    color: "Red"
};

let union3: Union1 = {
    name: "Alice",
    age: 25,
    color: "Blue" // Person과 Car의 속성을 모두 가질 수 있음
};

// let union4: Union1 = {
//     age: 40,
//     color: "Green" 
// };
// 이 때, 반드시 객체의 속성들을 합집합으로 가져야 함!! 
// (예: name만 가지면 오류. age만 가지면 오류. age, color 만 가지면 오류. 등등..)


// 교집합
// type Person = {
//     name: string;
//     age: number;
// }

type Car = {
    name: string;
    color: string;
}

type Intersection1 = Person & Car; // Person과 Car의 교집합 타입

let intersection1: Intersection1 = {
    name: "John",
    age: 30,
    color: "Red" // Person과 Car의 속성을 모두 가져야 함 
    // (person이기도, car이기도 해야 하므로!)
};

// 타입 단언

// type Person = {
//     name: string;
//     age: number;
// }

let person = {} as Person; // 빈 객체를 Person 타입으로 단언

person.name = "John"; 
person.age = 30;

let extraPerson = { 
    name: "Alice",
    age: 25, 
    job: "Engineer" // Person 타입에 없는 속성 추가
} as Person; // 타입 단언을 사용하여 추가 속성 허용


let num1 = 10 as never;
// → 10은 never 의 서브타입

let num2 = 10 as unknown; 
// → 10은 unknown의 서브 타입

// let num3 = 10 as string; 
// 오류 발생


// 객체에 const 로 타입단언을 하면,
// 객체의 모든 속성이 readonly로 선언됨
// 속성값을 수정할 수 없는 객체가 됨

let cat = {
  name: "meow",
  color: "white",
} as const;

// non-null 단언

type Post = {
    title: string;
    author?: string; // author는 선택적 속성
}

let post:Post = {
    title: "Hello TypeScript",
    author: "John Doe"
};

const len: number = post.author!.length; // non-null 단언을 사용하여 author가 null이 아님을 보장


// 타입 좁히기

type Person = {
    name: string;
    age: number;
}

function narrowTest(value: string | number | Date | null | Person) { 
    if (typeof value === "string") {
        // value는 string 타입으로 좁혀짐
        console.log(value.toUpperCase()); // 문자열 메서드 사용 가능
    } else if (typeof value === "number") {
        // value는 number 타입으로 좁혀짐
        console.log(value.toFixed(2)); // 숫자 메서드 사용 가능
    } else if (value instanceof Date) { // typeof value === "object" 는 권장되지 않음. 
        // null의 typeof 결과도 "object" 이기 때문!
        // value는 Date 타입으로 좁혀짐
        console.log(value.getTime()); // 날짜 메서드 사용 가능
    } else if (value && "age" in value) { // value instanceof Person 는 사용 불가! instanseof는 객체 타입에만 사용 가능!
        // value는 Person 타입으로 좁혀짐
        console.log(`${value.name}은 ${value.age}살 입니다.`); // Person의 속성 사용 가능
    }
}

// 타입 유니온

type Admin = {
    tag: 'ADMIN'; // 태그를 사용하여 타입을 구분
    name: string;
    kickCount: number;
}

type Member = {
    tag: 'MEMBER'; // 태그를 사용하여 타입을 구분
    name: string;
    point: number;
}

type Guest = {
    tag: 'GUEST'; // 태그를 사용하여 타입을 구분
    name: string;
    visitCount: number;
}

type User = Admin | Member | Guest; // User는 Admin, Member, Guest의 유니온 타입

function login(user:User) {
    switch (user.tag) {
        case 'ADMIN':
            // user는 Admin 타입으로 좁혀짐
            console.log(`${user.name}님은 관리자입니다. ${user.kickCount}명 강퇴했습니다.`);
            break;
        case 'MEMBER':
            // user는 Member 타입으로 좁혀짐
            console.log(`${user.name}님은 ${user.point}포인트를 가지고 있습니다.`);
            break;
        case 'GUEST':
            // user는 Guest 타입으로 좁혀짐
            console.log(`${user.name}님은 ${user.visitCount}번 방문했습니다.`);
            break;
    }
    // if(user.tag === 'ADMIN') { // 'kickCount' in user 도 가능
    //     // user는 Admin 타입으로 좁혀짐
    //     console.log(`${user.name}님은 ${user.kickCount}명 강퇴했습니다.`);
    // } else if (user.tag === 'MEMBER') { // 'point' in user 도 가능
    //     // user는 Member 타입으로 좁혀짐
    //     console.log(`${user.name}님은 ${user.point}포인트를 가지고 있습니다.`);
    // }
    // else if (user.tag === 'GUEST') { // 'visitCount' in user 도 가능
    //     // user는 Guest 타입으로 좁혀짐
    //     console.log(`${user.name}님은 ${user.visitCount}번 방문했습니다.`);
    // }
}

// type AsyncTask = { // 이렇게 하나로 정의하면 성공 및 실패 시 response나 error의 존재를 보장할 수 없음. 
// => 타입 좁히기 실패!
//     state: 'LOADING' | 'SUCCESS' | 'ERROR'; 
//     response?: {
//         data: string; // 성공 시 응답 데이터
//     };
//     error?: {
//         message: string; // 오류 메시지
//     };
// }

type AsyncTaskLoading = {
    state: 'LOADING'; // 로딩 상태
}
type AsyncTaskSuccess = {
    state: 'SUCCESS'; // 성공 상태
    response: {
        data: string; // 성공 시 응답 데이터
    };
}
type AsyncTaskError = {
    state: 'ERROR'; // 오류 상태
    error: {
        message: string; // 오류 메시지
    };
}

const loading: AsyncTaskLoading = {
    state: 'LOADING',

}

const success: AsyncTaskSuccess = {
    state: 'SUCCESS',
    response: {
        data: '데이터',
    },
}

const error: AsyncTaskError = {
    state: 'ERROR',
    error: {
        message: '오류 메시지',
    },
}

type AsyncTask = AsyncTaskLoading | AsyncTaskSuccess | AsyncTaskError; // 유니온 타입으로 정의

function handleAsyncTask(task: AsyncTask) {
    switch (task.state) {
        case 'LOADING':
            console.log('로딩 중...');
            break;
        case 'SUCCESS':
            console.log('성공:', task.response.data);
            break;
        case 'ERROR':
            console.error('오류:', task.error.message);
            break;
    }
}