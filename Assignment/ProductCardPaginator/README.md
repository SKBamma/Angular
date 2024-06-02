
### Angular-Homework-03

* Install [Angular Material](https://material.angular.io/) and explore the `Card` and `Paginator` components.
* Go to [DummyJSON API](https://dummyjson.com/products), save the response in `data.ts`, and type the data using [JSON to TS](https://transform.tools/json-to-typescript).
* Create a component `products` to display list of products with pagination.
   * Each product card has the name, description, thumbnail, and a button `More...` to show the full product details.
   * Use the necessary pipes to truncate the product title and description.
* When the user clicks on the product `More...` button, display a component that shows the full product details. This `product` details component receives the data from its parent component.
  
Notes:
* Use `signal` to hold the components state.
* Use `computed` to compute the product details of the product that needs to be displayed in the `product` component.
* Use `effect` to log the `id` of the currently displayed product.
* Apply the idea of Container/Stateful vs. Representational/Stateless components in your code. The `products` component is stateful, and the `product` component is stateless.
  
The following HTML/CSS will center the content of the page horizontally and vertically:
```html
<div class="container">
   <div class="centered">Content</div>
</div>
```
```css
.container{
    /* Center horizontally */
    margin: 0 auto;
    width: 400px;
    height: 100vh;
    /* Setup to center vertically */
    position: relative;
}
.centered{
  /* Center vertically */
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
```
