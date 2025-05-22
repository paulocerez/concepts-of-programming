# Concepts of Programming Languages

## Table of Contents
1. [Syntax and Semantics](#syntax-and-semantics)
2. [Variables and Scoping](#variables-and-scoping)
   - [Variables](#variables)
   - [Scoping](#scoping)
   - [Global vs Local vs Block Scope](#global-vs-local-vs-block-scope)
   - [Scope Chain](#scope-chain)
   - [Shadowing](#shadowing)
   - [Lexical Scoping](#lexical-scoping)
   - [Scoping Best Practices](#scoping-best-practices)
3. [Type Systems](#type-systems)
   - [Static vs Dynamic Typing](#static-vs-dynamic-typing)
   - [Type Inference](#type-inference)
4. [Object-Oriented Programming](#object-oriented-programming)
   - [Classes and Objects](#classes-objects)
   - [Inheritance](#inheritance)
   - [Types of Inheritance](#types-of-inheritance)
   - [Encapsulation](#encapsulation)
   - [Polymorphism](#polymorphism)
5. [Functional Programming](#functional-programming)
   - [Pure Functions, Referential Transparency, and Immutability](#pure-functions-referential-transparency-and-immutability)
   - [Higher-Order Functions](#higher-order-functions)
   - [Anonymous Functions and Lambda Expressions](#anonymous-functions-lambda-expressions)
   - [Function Transformations](#function-transformations)
     - [Currying](#currying)
     - [Partial Application](#partial-application)
     - [Composition](#composition)
6. [OOP vs Functional Programming](#oop-vs-functional-programming)
   - [Key Differences](#key-differences)
   - [When to Use Each Paradigm](#when-to-use-each-paradigm)

## Syntax and Semantics

### Syntax
The grammar of a programming language that defines how programs should be written. Ruleset dictating the structure of expressions.

e.g. Function Syntax in Typescript:
- `function` keyword
- brackets `()`, `{}`
- optional: function name, parameters, return type, function body

```typescript
function add(a, b) {
    return a + b
}
```

### Semantics
The meaning of instructions and constructs in a programming language that defines how programs should be executed. Dictating the meaning of syntax.

```typescript
if (x > 0) {
    console.log("Positive")
} else {
    console.log("Negative")
}
```

## Variables and Scoping

### Variables
A named location (container) in memory that stores data. How variables are declared, initialized, and accessed varies by language.

```typescript
// JavaScript
let x = 10 // mutable
const x = 10 // immutable

// Python
x = 10 // just assigned

// Java
int x = 10; // initialized and declared at the same time
```


### Scoping
The region of code (context) where a variable is declared and accessible. This dictates the visibility and lifetime of the variable and therefore affects code behavior and interactions.

#### Global vs Local vs Block Scope

- Global: Variables declared outside of any function or block, accessible everywhere. Prone to conflicts, less modular and organized.

- Local: Variables declared within a function, encompassing the entire function body. More isolated, less prone to conflicts, reusable when the function is called.

- Block: Variables declared within a block (e.g. `if`, `for`, `while`), accessible only within the respective block.

```typescript
let count = 0; // Global scope

function incrementCounter() {
    let message = "Counter incremented!"; // Local scope
    count += 1;
    
    if (count > 5) {
        let status = "Maximum reached"; // Block scope
        console.log(status); // "Maximum reached"
        console.log(message); // "Counter incremented!"
        console.log(count); // 6 (global variable)
    }
    
    console.log(message); // "Counter incremented!"
    
    // status is NOT accessible here (block scope)
    // console.log(status); // ReferenceError: status is not defined
}

incrementCounter();
console.log(count); // 1 (global variable is accessible)

// message is NOT accessible here (block scope)
```

### Scope Chain
The top-down order (linked-list) in which variables are searched for in a nested scope by the compiler. Hierarchical structure of scopes that determines variable lookup during code execution

```typescript
let greeting = "Hello World"; // Global

function outer() {
    let message = "Hi there"; // Outer function scope
    
    function inner() {
        // inner() first looks for variables in its own scope
        // then in outer()'s scope, then in global scope
        console.log(message); // "Hi there" - found in outer scope
        console.log(greeting); // "Hello World" - found in global scope
    }
    
    inner();
}

outer();
```

#### Lexical (Static) Scoping
Variable access is determined by the physical location in the source code (where variable is defined).

```typescript
function createCounter() {
    let count = 0; // This variable is "captured" by the inner function
    
    return function increment() {
        count++; // Access to count is determined by where the function is defined
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

#### Dynamic Scoping
Variable access is determined by the runtime context (where the function is called from). Variable resolution follows the call stack rather than the lexical structure.

```bash
# Bash

x=1

function print_x {
  echo $x
}

function example {
  local x=2
  print_x  # Will print 2, not 1
}

```


### Closures
Bundles a function and the environment in which it was created (the variables it needs to access). Intersection of function scope and the scope chain.

```typescript
function init() {
    let name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    displayName();
}
init(); // Output: Mozilla
```

Benefits:
- ✅ Data & Behavior encapsulation
- ✅ State management
- ✅ Code organization
- ✅ Reusability

### Scoping Best Practices
- Use block scope for variables that need to be accessed within a specific block
- Use closures to manage state and behavior
- Use descriptive variable names
- Limit the use of global variables
- Avoid variable shadowing to avoid conflicts


## Type Systems

A set of rules that assign a property called "type" to various program constructs such as variables, functions, and expressions. Types attach semantic meaning to the data and operations, providing a set of rules for what can be done with it (set of possible values and operations).

There are primitive (number, string, boolean, etc.) and composite (object, array, function, etc.) types, depending on whether the type is built into the language.

Type checking as an algorithm that validates rules of types at a certain point in the program. Either at compile time or runtime.

### Static vs Dynamic Typing

#### Static Typing
Type checking is performed at compile time, before runtime (before the program is executed). Statically typed languages often have dynamic typing as well as some data types can only be determined at runtime.

```typescript
// TypeScript
let num: number = 42;
num = "string"; // Error: Type 'string' is not assignable to type 'number'
```

```java
// Java
int num = 42;
num = "string"; // Error: Type 'string' is not assignable to type 'int'
```

#### Dynamic Typing
Type checking is performed at runtime, after the program is executed.

```javascript
// JavaScript
let x = 10;
x = "Hello"; // No error, x is now a string
console.log(x + 5); // Outputs: "Hello5" (string concatenation)
```

```python
# Python
x = 10
x = "Hello" # no error, x is now a string
print(x + 5) # Outputs: "Hello5" (string concatenation)
```

#### Comparison

| Aspect | Static Typing | Dynamic Typing |
|--------|--------------|----------------|
| Error Detection | ✅ Early (compile-time) | ❌ Late (runtime) |
| Performance | ✅ Generally better | ❌ Can be slower |
| IDE Support | ✅ Rich (autocomplete, refactoring) | ❌ Limited |
| Development Speed | ❌ Slower initial development | ✅ Faster for small projects |
| Flexibility | ❌ Less flexible | ✅ More flexible and expressive |
| Code Verbosity | ❌ More verbose | ✅ Less boilerplate |
| Metaprogramming | ❌ More difficult | ✅ Better support |
| Runtime Safety | ✅ More type safety | ❌ Type-related bugs in production |
| Compile Time | ❌ Longer compilation | ✅ No compilation step |
| Examples | Java, C++, TypeScript, Rust | JavaScript, Python, Ruby, PHP |

### Type Inference
Type inference is the ability of a compiler to automatically deduce the type of a variable based on its usage and initialization value, without requiring explicit type annotations.

It's primarily used in statically typed languages, benefiting from the static type checking without explicit type annotations. In dynamic typing, type inference is not really happening as variables don't have fixed types that need to be determined at compile time.

```typescript
// TypeScript (static typing with inference)
let name = "Alice";          // Type inferred as string
let age = 30;                // Type inferred as number
let active = true;           // Type inferred as boolean

function multiply(a: number, b: number) {
    return a * b;            // Return type inferred as number
}

// compiler statically determines all types at compile time without explicit annotations
```

```python
# Python (dynamic typing without inference)
name = "John" # string at runtime
name = 25 # now a number, type changed
```

**Benefits**
- Combines safety of static typing with the conciseness of dynamic typing
- Reduces verbosity while maintaining type safety
- Makes refactoring easier as types can adapt to changes
- Enables more elegant generic programming

**Limitations and Considerations**
- Can make code less readable as types aren't explicitly visible
- May lead to unexpected type deductions in complex expressions
- Complete type inference is undecidable in some type systems
- Error messages can be confusing when inference fails
- May hide performance implications of certain type choices

## Object-Oriented Programming
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data and code. Objects can interact with one another and their behaviors are defined by classes or prototypes.

### Classes, Objects

- ***Classes***: Blueprints or templates that define the structure and behavior of objects, serving as a foundation for creating instances
- ***Objects***: Instances of classes with their own state (data values) that represent specific entities with unique properties


```typescript
class Person {
    // Properties with access modifiers
    private name: string;
    private age: number;
    protected id: number;
    
    // Static property
    static count: number = 0;
    
    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.id = ++Person.count;
    }
    
    // Method
    public introduce(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
    
    // Getter
    get personName(): string {
        return this.name;
    }
    
    // Setter
    set personName(name: string) {
        if (name.length > 0) {
            this.name = name;
        }
    }
}

// Creating and using objects
const alice = new Person("Alice", 30);
console.log(alice.introduce());  // Hello, my name is Alice and I am 30 years old.
console.log(alice.personName);   // Alice
alice.personName = "Alicia";
console.log(alice.personName);   // Alicia
```

### Inheritance
Reusability of code, where a class can receive properties and methods from another class.

```typescript
class Employee extends Person {
    constructor(name: string, age: number, department: string) {
        super(name, age);
        this.department = department;
    }
}

const bob = new Employee("Bob", 25, "Sales");
console.log(bob.introduce());  // Hello, my name is Bob and I am 25 years old.
console.log(bob.department);   // Sales
```

#### Types of Inheritance

- **Single Inheritance**: A class inherits from only one parent class. Most common in languages like Java, C#, and TypeScript.
  ```typescript
  class Animal { }
  class Dog extends Animal { }
  ```

- **Multiple Inheritance**: A class inherits from multiple parent classes simultaneously. Supported in C++, Python.
  ```cpp
  // C++ example
  class Vehicle { };
  class FlyingObject { };
  class FlyingCar : public Vehicle, public FlyingObject { };
  ```

- **Interface Inheritance**: A class implements one or more interfaces, which define a contract of methods/properties the class must provide.
  ```typescript
  interface Swimmer {
      swim(): void;
  }
  
  interface Flyer {
      fly(): void;
  }
  
  class Duck implements Swimmer, Flyer {
      swim() { console.log("Swimming"); }
      fly() { console.log("Flying"); }
  }
  ```

- **Abstract Classes**: Partially implemented classes that cannot be instantiated directly but must be subclassed. They can contain both implemented methods and abstract methods (which subclasses must implement).
  ```typescript
  abstract class Shape {
      color: string;
      
      constructor(color: string) {
          this.color = color;
      }
      
      // Concrete method
      getColor(): string { 
          return this.color; 
      }
      
      // Abstract method - must be implemented by subclasses
      abstract calculateArea(): number;
  }
  
  class Circle extends Shape {
      radius: number;
      
      constructor(color: string, radius: number) {
          super(color);
          this.radius = radius;
      }
      
      calculateArea(): number {
          return Math.PI * this.radius * this.radius;
      }
  }
  ```

- **Class-based Inheritance**: Inheritance based on classes as blueprints. Common in Java, C++, C#, TypeScript.
  ```java
  // Java example
  class Vehicle { }
  class Car extends Vehicle { }
  ```

- **Prototype-based Inheritance**: Inheritance based on object prototypes rather than classes. Used in JavaScript.
  ```javascript
  // JavaScript example
  const animal = {
      makeSound() {
          console.log("Some sound");
      }
  };
  
  const dog = Object.create(animal);
  dog.makeSound = function() {
      console.log("Woof!");
  };
  
  // dog inherits from animal through the prototype chain
  ```

- **Multilevel Inheritance**: A class inherits from a child class, creating a parent-child-grandchild relationship.
  ```typescript
  class Animal { }
  class Mammal extends Animal { }
  class Dog extends Mammal { } // Multilevel: Dog -> Mammal -> Animal
  ```

- **Hierarchical Inheritance**: Multiple classes inherit from a single base class.
  ```typescript
  class Animal { }
  class Dog extends Animal { }
  class Cat extends Animal { }
  class Bird extends Animal { }
  ```

### Encapsulation
Bundling of data and methods that operate on that data within a single unit, and restricting access to some of the object's components, often through a class. This bundling creates a protective barrier, preventing direct access to the internal data from outside the class.

Access modifiers are the keywords controlling visibility and accessibility to class members, e.g. `public`, `private`, `protected`.

```typescript
class BankAccount {
    // Private properties - cannot be accessed directly from outside
    private accountNumber: string;
    private balance: number;
    private owner: string;
    
    constructor(owner: string, initialBalance: number) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountNumber = Math.floor(Math.random() * 1000000).toString();
    }
    
    // Public methods - interface to interact with the object
    public deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
    }
    
    public withdraw(amount: number): boolean {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return false;
        }
        
        this.balance -= amount;
        return true;
    }
    
    // Getter methods - controlled access to private data
    public getBalance(): number {
        return this.balance;
    }
    
    public getAccountSummary(): string {
        return `Account #${this.accountNumber} owned by ${this.owner} has balance $${this.balance}`;
    }
}

// Using the encapsulated class
const account = new BankAccount("Alice", 1000);

// Cannot access private properties directly
// console.log(account.balance); // Error: Property 'balance' is private

// Must use public methods
account.deposit(500);
console.log(account.getBalance()); // 1500
account.withdraw(200);
console.log(account.getAccountSummary()); // Account #123456 owned by Alice has balance $1300
```

### Polymorphism
Ability of different objects to respond to the same method call in different ways, allowing objects of different classes to be treated through a common interface. An object can take on many forms, meaning the same method can be used with different types of objects and produce different results.

```typescript
// Base class with a method that will be overridden
abstract class Shape {
    abstract calculateArea(): number;
    
    describe(): string {
        return `This shape has an area of ${this.calculateArea()} square units`;
    }
}

// Derived classes implementing the abstract method
class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    // Additional method specific to Circle
    getDiameter(): number {
        return this.radius * 2;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }
    
    calculateArea(): number {
        return this.width * this.height;
    }
}

class Triangle extends Shape {
    constructor(private base: number, private height: number) {
        super();
    }
    
    calculateArea(): number {
        return (this.base * this.height) / 2;
    }
}

// Polymorphic behavior: Using different shapes through a common interface
function printShapeInfo(shape: Shape): void {
    console.log(shape.describe());
    
    // This is possible with runtime type checking
    if (shape instanceof Circle) {
        console.log(`Circle diameter: ${shape.getDiameter()}`);
    }
}

// Create different shapes
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const triangle = new Triangle(3, 8);

// All can be treated as Shape objects even though their implementations differ
const shapes: Shape[] = [circle, rectangle, triangle];

// Same method call produces different results based on the actual object type
shapes.forEach(shape => {
    console.log(shape.describe());
});

// Outputs:
// This shape has an area of 78.54 square units
// This shape has an area of 24 square units
// This shape has an area of 12 square units

printShapeInfo(circle); // Accesses both Shape and Circle-specific methods
```

#### Dynamic Dispatch, Late Binding

**Dynamic Dispatch**: The process of determining which implementation of a method to call at runtime rather than compile time. When a method is called on an object, the runtime system determines the actual type of the object and invokes the appropriate method implementation.

```typescript
// The actual implementation called depends on the runtime type
function calculateAndPrint(shape: Shape): void {
    // Dynamic dispatch happens here - the runtime determines 
    // which calculateArea() method to call based on the actual object type
    const area = shape.calculateArea();
    console.log(`The area is ${area}`);
}

calculateAndPrint(new Circle(5));    // Calls Circle's calculateArea()
calculateAndPrint(new Rectangle(4, 3)); // Calls Rectangle's calculateArea()
```

**Late Binding (or Dynamic Binding)**: The binding of a method call to its implementation occurs at runtime based on the actual object type, not the reference type. This contrasts with early (static) binding, where method calls are resolved at compile time.

```typescript
class Animal {
    makeSound(): string {
        return "Some generic sound";
    }
}

class Dog extends Animal {
    makeSound(): string {
        return "Woof!";
    }
}

class Cat extends Animal {
    makeSound(): string {
        return "Meow!";
    }
}

// Late binding example
const animals: Animal[] = [new Dog(), new Cat(), new Animal()];

animals.forEach(animal => {
    // The binding of which makeSound() to call happens at runtime
    console.log(animal.makeSound());
});
// Outputs:
// Woof!
// Meow!
// Some generic sound
```

## Functional Programming
Programming paradigm where programs are constructed by applying and composing mathematical functions. Focus lies on what to solve, not how to solve it. 

### Pure Functions, Referential Transparency, and Immutability
- ***Pure Functions***: Functions that return a value that depends only on their input arguments, without side effects (e.g. changing state or output for the same input)

    ```typescript
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

- ***Referential Transparency***: The ability to replace a function's call with its return value without changing the program's behavior

    ```typescript
    const result = add(2, 3); // result is 5
    const result2 = add(2, 3); // result2 is also 5
    ```
- ***Immutability***: Objects are immutable, meaning their state cannot be changed once created.

    ```typescript
    // Creation of new objects with the desired changes instead of modification
    
    // Original objects
    const user = { name: "Alice", age: 30, settings: { theme: "light", notifications: true } };
    const numbers = [1, 2, 3, 4, 5];
    
    // ❌ Mutable approach
    function incrementAgeMutable(user) {
        user.age += 1;
        return user;
    }
    
    // ✅ Immutable approach 
    function incrementAge(user) {
        return { ...user, age: user.age + 1 }; // Returns a new object
    }
    
    // For nested objects, create new copies at each level
    function updateTheme(user, newTheme) {
        return {
            ...user,
            settings: {
                ...user.settings,
                theme: newTheme
            }
        };
    }
    
    // For arrays, use non-mutating methods
    const addNumber = (arr, num) => [...arr, num]; // Instead of arr.push(num)
    const removeNumber = (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1)];
    const updateNumber = (arr, index, newValue) => [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    
    const updatedUser = incrementAge(user);
    const userWithNewTheme = updateTheme(user, "dark");
    const extendedNumbers = addNumber(numbers, 6);
    ```

    **Benefits**
    - ✅ Predictable behavior
    - ✅ Easier to reason about
    - ✅ Better testability
    - ✅ Thread safety
    - ✅ Reduced side effects

    **Limitations**
    - ❌ Performance overhead for immutable operations
    - ❌ Learning curve for imperative programmers
    - ❌ More memory usage due to immutability

### Higher-Order Functions
Functions that take other functions as arguments or return functions as results, enabling code composition and abstraction.

```typescript
function processArray(arr: number[], callback: (num: number) => number): number[] {
    return arr.map(callback);
}
```

#### Common Higher-Order Functions
- `map`: Applies a function to each element of an array and returns a new array with the results
- `filter`: Filters elements of an array based on a condition
- `reduce`: Applies a function to each element of an array and accumulates the results
- Function Composition: Combining multiple functions to create more complex functions -> output of one function becomes the input of another

```typescript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const even = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
```

```typescript
function applyNTimes<T>(fn: (x: T) => T, n: number): (x: T) => T {
    return function(x: T): T {
        if (n <= 0) return x;
        
        let result = x;
        for (let i = 0; i < n; i++) {
            result = fn(result);
        }
        return result;
    };
}

const double = (x: number) => x * 2;
const triple = (x: number) => x * 3;

const doubleTwice = applyNTimes(double, 2); 
const tripleThrice = applyNTimes(triple, 3); 

console.log(doubleTwice(3));  // 3 → 6 → 12
console.log(tripleThrice(2)); // 2 → 6 → 18 → 54
```

**Benefits**
- ✅ Encourages code reuse and composition
- ✅ Leads to more declarative programming style
- ✅ Reduces mutable state
- ✅ Makes parallel processing easier

**Limitations**
- ❌ Can be inefficient compared to imperative loops
- ❌ Steeper learning curve for imperative programmers
- ❌ May create many intermediate collections
- ❌ Can make stack traces harder to understand

### Anonymous Functions, Lambda Expressions
Functions without explicit names that can be passed as arguments, stored in variables, and returned from other functions -> Lambda Expressions  as concise syntax for writing anonymous functions, often used for short, one-off operations.

```typescript
const add = (a: number, b: number) => a + b;
```

```python
add = lambda a, b: a + b
```

### Function Transformations
Function transformations are techniques for manipulating and working with functions to create more specialized or complex behavior. These techniques are fundamental to functional programming and enable code reuse, composition, and abstraction.

#### Currying, Partial Application
Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument or fixing a number of arguments to a function, producing another function of smaller arity. These techniques allows for creating specialized functions from more general ones.

```typescript
// Normal function with multiple arguments
function add(a: number, b: number): number {
    return a + b;
}

// Curried version
function curriedAdd(a: number): (b: number) => number {
    return function(b: number): number {
        return a + b;
    };
}

const add5 = curriedAdd(5); // Creates a function that adds 5 to its argument
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

**Benefits of Currying:**
- ✅ Creates specialized functions from general ones
- ✅ Avoids repetition of arguments
- ✅ Enables function composition
- ✅ Supports partial application

#### Partial Application
Fixing a number of arguments to a function, producing another function of smaller arity. Unlike currying (which always reduces to one argument), partial application can fix any number of arguments.

```typescript
// Regular function
function greet(greeting: string, name: string, suffix: string): string {
    return `${greeting}, ${name}${suffix}`;
}

// Partial application using bind
const greetWithHello = greet.bind(null, "Hello");
console.log(greetWithHello("John", "!")); // "Hello, John!"

// Implementing our own partial application
function partial<T extends any[], R>(
    fn: (...args: T) => R, 
    ...fixedArgs: Partial<T>
): (...remainingArgs: any[]) => R {
    return function(...remainingArgs: any[]): R {
        return fn(...[...fixedArgs, ...remainingArgs] as T);
    };
}

// Using our partial function
const greetWithHi = partial(greet, "Hi");
const greetJaneWithHi = partial(greet, "Hi", "Jane");
console.log(greetWithHi("Alice", ".")); // "Hi, Alice."
console.log(greetJaneWithHi("!")); // "Hi, Jane!"

// Practical example: Configuring HTTP requests
const fetchFromAPI = (baseURL: string, endpoint: string, params: object) => {
    const url = `${baseURL}${endpoint}?${new URLSearchParams(params as any)}`;
    return fetch(url).then(res => res.json());
};

// Create a specialized function for a specific API
const fetchFromUsers = partial(fetchFromAPI, "https://api.example.com", "/users");
// Later use it with just the params
fetchFromUsers({ id: 123 }); // Fetches from https://api.example.com/users?id=123
```

#### Composition
Combining two or more functions to create a new function. The output of one function becomes the input of the next function, allowing complex operations to be built from simpler ones.

```typescript
// Simple functions to compose
const double = (x: number) => x * 2;
const increment = (x: number) => x + 1;
const multiply = (x: number) => x * 10;

function compose(...fns: ((x: number) => number)[]): (x: number) => number {
    return (x: number) => fns.reduce((acc, fn) => fn(acc), x);
}

const composedFunction = compose(multiply, increment, double);
console.log(composedFunction(3)); // 70
```

**Benefits of Composition:**
- ✅ Creates complex behavior from simple functions
- ✅ Promotes reusability and modularity
- ✅ Makes code more declarative and readable
- ✅ Reduces repetition and enables point-free style programming

**Point-free Style:**
Function composition often enables point-free style (tacit programming), where function definitions don't explicitly identify the arguments.

```typescript
// With explicit arguments
const getNames = (users: User[]): string[] => {
    return users.map(user => user.name);
};

// Point-free style
const getName = (user: User): string => user.name;
const getNames = users.map(getName);
```

## OOP vs Functional Programming

### Key Differences

| Aspect | Object-Oriented Programming | Functional Programming |
|--------|---------------------------|------------------------|
| Basic Unit | Objects (data + behavior) | Functions |
| State | Mutable state | Immutable data |
| Primary Manipulation | Objects change their internal state | Functions transform data without side effects |
| Data & Behavior | Tightly coupled within objects | Separated (data structures and functions that operate on them) |
| Inheritance | Through class hierarchies | Through composition |
| Code Organization | Classes and objects | Functions and modules |
| Control Flow | Imperative (how to do things) | Declarative (what to do) |
| Error Handling | Exceptions | Return values (Maybe, Either patterns) |
| Concurrency | Locks, synchronization | Easier due to immutability |
| Examples | Java, C++, C#, Python | Haskell, Clojure, Scala, Erlang |
| Strengths | Modeling real-world entities, maintainable large systems | Reasoning about code, parallelism, mathematical correctness |
| Weaknesses | Complexity in large systems, state-related bugs | Learning curve, performance overhead for some operations |

### When to use each paradigm

**OOP**
- Modeling real-world entities with complex state
- Building large systems with many developers
- Working with GUI applications
- Extending existing OOP frameworks/codebases
- State management is central to the application

**Functional Programming**
- Building concurrent/parallel systems
- Working with data transformations and pipelines
- Creating mathematical or algorithmic solutions
- Building systems where correctness is critical
- Working with immutable data streams
- Testing and reasoning about code are priorities

Many modern languages and frameworks support both paradigms, allowing developers to use the best approach for each specific problem.