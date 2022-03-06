function Form() {

    return (
      <div>
         <form>
             <label>
             <p>City 1</p>
             <input name="city1" placeholder="Enter first city"></input>
             </label>
             <label>
             <p>City 2</p>
             <input name="city2" placeholder="Enter second city"></input>
             </label>
             <button type="submit">Go!</button>
         </form>
      </div>
    );
  }
  
  export default Form;