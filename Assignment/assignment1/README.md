
### Angular-Homework-01

* Create an Angular application
* Create a new component `students`
* Display the `students` component as a child to `AppComponent`
* Add the following state to the `students` component:
```typescript
students = [{ _id: "1", name: "Rajesh Khanna" }, { _id: "2", name: "Ram Baran Yadav" }, { _id: "3", name: "Janaki Sharma" }, { _id: "4", name: "Kamal Kapoor" }]
```
* Display list of students, and use Directives to apply a zebra background color (odd rows in grey, even rows in white)
* Use Pipes to display all names in title case
* Use Pipes to truncate long names to be limited to 20 chars, and display three dots `...` at the end if they were truncated
