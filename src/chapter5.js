// 클래스와 객체

class Student {
    // 필드
    name;
    age;
    grade;

    // 생성자
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    // 메소드
    getInfo() {
        return `${this.name} is ${this.age} years old and in grade ${this.grade}.`;
    }
    setGrade(newGrade) {
        this.grade = newGrade;
    }
}

let student1 = new Student("Alice", 20, "A");
student1.getInfo(); // "Alice is 20 years old and in grade A."
student1.setGrade("B");
student1.getInfo(); // "Alice is 20 years old and in grade B."

// 상속

class StudentDeveloper extends Student {
    constructor(name, age, grade, programmingLanguage) {
        super(name, age, grade); // 부모 클래스의 생성자를 호출
        this.programmingLanguage = programmingLanguage;
    }

    getInfo() {
        return `${super.getInfo()} Currently learning ${this.programmingLanguage}.`;
    }
}

let student2 = new StudentDeveloper("Bob", 22, "B", "JavaScript");
console.log(student2.getInfo()); // "Bob is 22 years old and in grade B. Currently learning JavaScript."