### Angular-Homework-02

1. Practice the following with signals:
   * create a signal `$count` with 0 value, to represent a counter
   * when the component mount, create an interval to increment the `$count` signal value by one
   * display the `$count` signal in the template
   * create a computed signal `$is_prime`, so when the `$count` signal value is a prime number, it's set to `true`, otherwise it's set to `false`.
   * based on the `$is_prime` signal value, display a message in the template to indicate whether the number value is prime or not.
   * create an effect, so when `$is_prime` is `true`, it prints to the console a message: `Found a Prime number: n`
  
```typescript
// the effect prints to the console the following:
// Found a Prime Number 2
// Found a Prime Number 3
// Found a Prime Number 5
// Found a Prime Number 7
// Found a Prime Number 11
// Found a Prime Number 13
// Found a Prime Number 17
```
2. Create a custom pipe `shorten` that truncates strings for a given length and concatenate `...` at the end. Example:
```typescript
@Component({template: `{{'Welcome to SD555 course' | shorten:10}}`}) // it will render `Welcome to...`
```
```typescript
@Component({template: `{{'Welcome MSD!' | shorten:25}}`}) // it will render `Welcome MSD!`, no changes.
```
3. Create a custom pipe `swapLetters` that works on strings and receives a swap object as follows: `{'old_letter': 'new_letter', ...}`. Example:
```typescript
@Component({template: `{{'Asaad and Theo' | swapLetters:{'a':'@', 'o': '0'} }}`}) // it will render `@s@@d @nd The0`
```

