# Concepts of Programming Languages

## Table of Contents
1. [Syntax and Semantics](#syntax-and-semantics)
2. [Variables and Scoping](#variables-and-scoping)
3. [Type Systems](#type-systems)
4. [Object-Oriented Programming](#object-oriented-programming)
5. [Functional Programming](#functional-programming)
6. [OOP vs Functional Programming](#oop-vs-functional-programming)

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
var x = 10 // Function scoped, can be redeclared in the same scope
let x = 10 // Block scoped, cannot be redeclared in the same scope
const x = 10 // Block scoped, cannot be reassigned in the same scope
```


### Scoping
The region of code (context) where a variable is declared and accessible. This dictates the visibility and lifetime of the variable and therefore affects code behavior and interactions.

```typescript
function add(a, b) {
    return a + b
}
```
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
The top-down order in which variables are searched for in a nested scope by the compiler.

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

#### Shadowing
When a variable in a nested scope has the same name as a variable in an outer scope, hiding the outer variable.

```typescript
let value = 10; // Global value

function calculate() {
    let value = 20; // shadowing global value
    
    console.log(value); // 20 - referring to local value
    
    function inner() {
        let value = 30; // shadowing both outer values
        console.log(value); // 30 - referring to inner value
    }
    
    inner();
    console.log(value); // 20 - referring to local value
}

calculate();
console.log(value); // 10 - refers to global value
```

#### Lexical Scoping
Variable access is determined by the physical location in the source code (where variables are defined).

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

### Closures
Bundles a function and the environment in which it was created (the variables it needs to access). Intersection of function scope and the scope chain.

```typescript
function createCounter(x) {
    return function(y) {
        return x + y
    }
}
```

Benefits:
- ✅ Data & Behavior encapsulation
- ✅ State management
- ✅ Code organization
- ✅ Reusability

### Scoping Best Practices
- Use block scope for variables that need to be accessed within a specific block
- Use lexical scoping to avoid variable conflicts
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

#### Dynamic Typing
Type checking is performed at runtime, after the program is executed.

```javascript
// JavaScript
let x = 10;
x = "Hello"; // No error, x is now a string
console.log(x + 5); // Outputs: "Hello5" (string concatenation)
```

#### Advantages and Disadvantages

**Static Typing:**

- ✅ Early error detection
- ✅ Better performance (typically)
- ✅ Better IDE support and tooling
- ❌ Less flexibility
- ❌ More verbose code
- ❌ Longer compile times
- ❌ More difficult to support certain programming patterns

**Dynamic Typing:**

- ✅ Faster development for small projects
- ✅ More flexibility and expressiveness
- ✅ Less boilerplate code
- ✅ Better support for dynamic loading and metaprogramming
- ❌ Runtime errors can occur
- ❌ Type-related bugs may reach production
- ❌ Can be slower at runtime
- ❌ Less effective IDE support

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
  class Dog extends Animal { } // Dog inherits only from Animal
  ```

- **Multiple Inheritance**: A class inherits from multiple parent classes simultaneously. Supported in C++, Python.
  ```cpp
  // C++ example
  class Vehicle { };
  class FlyingObject { };
  class FlyingCar : public Vehicle, public FlyingObject { }; // Inherits from both
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
    // Immutable data example
    // Instead of modifying objects directly, create new ones with the desired changes
    
    // Original objects
    const user = { name: "Alice", age: 30, settings: { theme: "light", notifications: true } };
    const numbers = [1, 2, 3, 4, 5];
    
    // ❌ Mutable approach (avoid in functional programming)
    function incrementAgeMutable(user) {
        user.age += 1; // Directly modifies the input object
        return user;
    }
    
    // ✅ Immutable approach 
    function incrementAge(user) {
        return { ...user, age: user.age + 1 }; // Returns a new object without modifying original
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
    
    // Immutable operations in action
    const updatedUser = incrementAge(user);
    const userWithNewTheme = updateTheme(user, "dark");
    const extendedNumbers = addNumber(numbers, 6);
    
    console.log(user); // Original unchanged: { name: "Alice", age: 30, settings: { theme: "light", ... } }
    console.log(updatedUser); // New object: { name: "Alice", age: 31, settings: { theme: "light", ... } }
    console.log(userWithNewTheme); // { name: "Alice", age: 30, settings: { theme: "dark", ... } }
    console.log(numbers); // Original unchanged: [1, 2, 3, 4, 5]
    console.log(extendedNumbers); // New array: [1, 2, 3, 4, 5, 6]
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
Functions that take other functions as arguments or return functions as results, enabling code composition and abstraction

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
Functions without explicit names that can be passed as arguments, stored in variables, and returned from other functions -> Lambda Expressions  as concise syntax for writing anonymous functions, often used for short, one-off operations

```typescript
const add = (a: number, b: number) => a + b;
```

```python
add = lambda a, b: a + b
```

### Currying

### Partial Application

### Composition

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

**Choose OOP when:**
- Modeling real-world entities with complex state
- Building large systems with many developers
- Working with GUI applications
- Extending existing OOP frameworks/codebases
- State management is central to the application

**Choose Functional Programming when:**
- Building concurrent/parallel systems
- Working with data transformations and pipelines
- Creating mathematical or algorithmic solutions
- Building systems where correctness is critical
- Working with immutable data streams
- Testing and reasoning about code are priorities

Many modern languages and frameworks support both paradigms, allowing developers to use the best approach for each specific problem.