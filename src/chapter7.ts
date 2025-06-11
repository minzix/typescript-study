type Post = {
    title: string;
    content: string;
    author: {
        name: string;
        age: number;
    }
}

function printAuthorInfo (author: Post["author"]): void { 
    // Post["author"]: indexed access type
    console.log(`Author: ${author.name}, Age: ${author.age}`);
}

const post: Post = {
    title: "TypeScript Basics",
    content: "This is a post about TypeScript basics.",
    author: {
        name: "Minji",
        age: 23
    }
};

printAuthorInfo(post.author);

type PostList = { // 배열
    title: string;
    content: string;
    author: {
        name: string;
        age: number;
    }
}[]; 

function printAuthorInfo1 (author: PostList[number]["author"]): void { 
    console.log(`Author: ${author.name}, Age: ${author.age}`);
}

const postList: PostList[number] = {
    title: "TypeScript Basics",
    content: "This is a post about TypeScript basics.",
    author: {
        name: "Minji",
        age: 23
    }
};

printAuthorInfo(post.author);

type Tub = [number, string, boolean];

type Tub0 = Tub[0]; // number

type Tub1 = Tub[1]; // string

type Tub2 = Tub[2]; // boolean

type TubNum = Tub[number]; // number | string | boolean

// interface Person {
//     name: string;
//     age: number;
//     email: string;
// }

// // key: "name" | "age" | "email" 등 union 연산자로 명시하는 것은 권장하지 않음
// // 인터페이스의 정보가 바뀌거나 확장될 때, union 타입을 수동으로 업데이트해야 하기 때문
// function getPropertyKey (person: Person, key: keyof Person){
//     return person[key];
// }

// const person: Person = {
//     name: "Minji",
//     age: 23,
//     email: "minzikx@gmail.com"
// };

// getPropertyKey(person, "name"); // "Minji"
// getPropertyKey(person, "age"); // 23

type Person = typeof person;

function getPropertyKey (person: Person, key: keyof typeof person){
    return person[key];
}

const person = {
    name: "Minji",
    age: 23,
    email: "minzikx@gmail.com"
};

getPropertyKey(person, "name"); // "Minji"
getPropertyKey(person, "age"); // 23

interface User {
    name: string;
    age: number;
    email: string;
}

type PartialUser = {
    [key in keyof User]?: User[key];
};

type ReadOnlyUser = {
    readonly [key in keyof User]: User[key];
};

// 한명의 사용자 정보 불러오기
function getUserInfo(): ReadOnlyUser {
    // ... 사용자 정보를 가져오는 로직
    return {
        name: "Minji",
        age: 23,
        email: "minzikx@example.com"
    }
}

getUserInfo();

// 한명의 사용자 정보 수정하기
function updateUserInfo(user: PartialUser): PartialUser {
    // ... 사용자 정보를 수정하는 로직
    return {
        age: user.age !== undefined ? user.age + 1 : 0 // 예시로 나이를 1살 증가
    }
}

updateUserInfo(
    {
        age: 24
    }
)

