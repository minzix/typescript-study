class Employee {
    // 필드
    name: string;
    age: number;
    position: string;

    // 생성자
    constructor (name: string, age: number, position: string) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
    // 메소드
    getDetails(): string {
        return `${this.name}, ${this.age} years old, Position: ${this.position}`;
    }
}

// 인스턴스 생성
const employee1 = new Employee("Alice", 30, "Developer");

// 타입스크립트의 클래스는 타입으로도 활용 가능!
const employee2: Employee = {
    name: "Bob",
    age: 25,
    position: "Designer",
    getDetails: function () {
        return `${this.name}, ${this.age} years old, Position: ${this.position}`;
    }
};

class Supervisor extends Employee {
    department: string;

    constructor(name: string, age: number, position: string, department: string) {
        super(name, age, position); // 부모 클래스의 생성자 호출
        this.department = department;
    }

    getDetails(): string {
        return `${super.getDetails()}, Department: ${this.department}`;
    }
}

// 인스턴스 생성
const supervisor1 = new Supervisor("Charlie", 40, "Team Lead", "Engineering");


// 접근 제어자
// 1. 필드에 정의하기
class Person1 {
    // 필드
    public name: string;
    private age: number;
    protected email: string;
    // 생성자
    constructor (name: string, age: number, email: string) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

// 2. 생성자에 정의하기
class Person2 {
    // 필드를 생략해야 함
    // name: string;
    // age: number;
    // email: string;
    // 생성자
    constructor (public name: string, private age: number, protected email: string) {
        // this.name = name; // 이 부분도 생략해도 됨 (필수는 아님)
        // this.age = age;
        // this.email = email;
    }
}

// 인터페이스와 클래스

interface CharacterInterface {
    name: string;
    level: number;
    attack(): void;
    defend(): void;
}

class Warrior implements CharacterInterface {
    name: string;
    level: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }

    attack(): void {
        console.log(`${this.name} attacks with a sword!`);
    }

    defend(): void {
        console.log(`${this.name} raises a shield!`);
    }
}