# Architecture

```jsx

Element A -> {color: 'blue', padding: '10px'}
Element B -> {color: 'red', borderRight: '1px solid #333'}
Element C -> {display: 'none'}
Element D -> {padding: 10}

Result:

.A {
  color: blue
}

.A, .D {
  padding: '10px'
}

.B {
  border-right: '1px solid #333'
}

.C {
  display: 'none';
}

````
