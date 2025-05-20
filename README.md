# Concepts of Programming Languages

## Table of Contents
1. [Syntax and Semantics](#syntax-and-semantics)
2. [Variables and Scoping](#variables-and-scoping)
3. [Type Systems](#type-systems)
4. [Object-Oriented Programming Concepts](#object-oriented-programming-concepts)
5. [Functional Programming Concepts](#functional-programming-concepts)
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

### Classes, Objects, and Inheritance

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

#### Inheritance
Reusability of code through inheritance, where a class can receive properties and methods from another class.

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

### Encapsulation

### Polymorphism

### Abstraction



## Functional Programming

### Pure Functions, Referential Transparency, and Immutability

### Higher-Order Functions

### Anonymous Functions, Lambda Expressions

### Currying

### Partial Application

### Composition

